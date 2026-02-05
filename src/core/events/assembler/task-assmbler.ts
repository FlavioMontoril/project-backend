import { MakeFindByIdTaskFactory } from "@/core/factory/task-factory/make-find-by-id-use-case-factory.js";
import { TaskCreatedEvent } from "../task-created-event.js";
import { ResourceNotFoundException } from "@/core/exceptions/ResourceNotFoundException.js";

export class TaskAssembler {
    static async build(event: TaskCreatedEvent, notificationId?: string, readAt?: Date | null, occurredOn?: Date): Promise<Record<string, unknown>> {
        const findTaskById = MakeFindByIdTaskFactory.build();

        const task = await findTaskById.execute(event.taskId);
        if (!task) throw new ResourceNotFoundException();

        return {
            task: {
                id: task?.getId(),
                summary: task?.getSummary(),
                createdAt: task?.getCreatedAt(),
            },
            id: notificationId,
            read: !!readAt,
            occurredOn: occurredOn || event.occurredOn,
        };
    }
}