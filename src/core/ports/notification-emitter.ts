import { Notification } from "@/core/entities/notification-entity.js"

export interface NotificationEmitter {
  emitToUser(
    userId: string,
    event: string,
    payload: Notification
  ): void
}
