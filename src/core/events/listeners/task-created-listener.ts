import { CreateNotificationFactory } from "@/core/factory/notification-factory/create-notification-factory.js";
import { EventEmitterSingletonInstance } from "../event-emitter-singleton.js";
import { TaskCreatedEvent } from "../task-created-event.js";
import { CreateNotificationRecipientFactory } from "@/core/factory/notification-recipient-factory/create-notification-recipient-factory.js";
import { MakeFindAllUsersFactory } from "@/core/factory/user-factory/make-find-all-users-factory.js";
import { TaskAssembler } from "../assembler/task-assmbler.js";
import { SocketService } from "@/adapters/lib/socketIO-service.js";


export class TaskCreatedListener {
    static init() {
        EventEmitterSingletonInstance.on(TaskCreatedEvent.name,
            async (event: TaskCreatedEvent) => {
                console.log(
                    `[Listener] Task criada: ${event.taskId} → usuário ${event.summary}`
                );

                const createNotification = CreateNotificationFactory.build();
                const createNotificationRecipient = CreateNotificationRecipientFactory.build();
                const findUsers = MakeFindAllUsersFactory.build();

                const notification = {
                    content: `Task created: ${event.summary} (${event.taskId})`,
                    triggeredId: event.userId,
                    entityType: "Task",
                    createdAt: event.occurredOn,
                };

                const notificationSaved = await createNotification.execute(notification);
                const users = await findUsers.execute();

                for await (const user of users) {
                    const notificationRecipient = {
                        notificationId: notificationSaved.getId().toString(),
                        userId: user.getId().toString(),
                        readAt: null,
                    };
                    await createNotificationRecipient.execute(notificationRecipient);
                }

                try {
                    const payload = await TaskAssembler.build(event, notificationSaved.getId().toString());
                    SocketService.emit(TaskCreatedEvent.name, payload);
                } catch (error) {
                    console.error("Socket.IO não inicializado:", error);
                }
            });
    }
}
