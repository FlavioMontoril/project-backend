export interface NotificationProps {
  id: string,
  userId: string
  title: string
  message: string
  type: NotificationType
  entityId?: string
  createdAt: Date
  read: boolean
}

export enum NotificationType {
  TASK_READ = "TASK_READ",
  TASK_UPDATED = "TASK_UPDATED",
  TASK_CREATED = "TASK_CREATED",
  TASK_DELETED = "TASK_DELETED",
  COMMENT_CREATED = "COMMENT_CREATED",
}