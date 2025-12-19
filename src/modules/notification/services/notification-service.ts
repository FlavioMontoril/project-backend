import { Notification } from "@/core/entities/notification-entity.js"
import { NotificationEmitter } from "@/core/ports/notification-emitter.js"
import { NotificationRepository } from "@/core/repository/contracts/notification-repository.js"
import { NotificationType } from "@/core/types/notification-types.js"

export class NotifyTaskAssignedService {
  constructor(
    private notificationRepository: NotificationRepository,
    private readonly notificationEmitter: NotificationEmitter
  ) { }

  async execute(data: {
    assigneeId: string
    taskId: string
    taskTitle: string
    reporterName: string
  }) {
    const notification = Notification.build({
      userId: data.assigneeId,
      title: "Nova tarefa atribuída",
      message: `Você recebeu a tarefa "${data.taskTitle}" de ${data.reporterName}`,
      type: NotificationType.TASK_CREATED,
      entityId: data.taskId,
    })

    const saved = await this.notificationRepository.create(notification)

    // socket emit isolado
    this.notificationEmitter.emitToUser(
      data.assigneeId,
      "notification:new",
      saved
    )
  }
}
