import { Notification } from "@/core/entities/notification-entity.js"

export interface NotificationRepository {
  create(notification: Notification): Promise<Notification>
  findByUserId(userId: string): Promise<Notification[]>
  markAsRead(notificationId: string): Promise<void>
  markAllAsRead(userId: string): Promise<void>
}
