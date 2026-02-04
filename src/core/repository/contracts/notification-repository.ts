import { Notification } from "@/core/entities/notification-entitie.js"

export interface NotificationRepository {
    create(notification: Notification): Promise<void>;
    findAll(): Promise<Notification[]>;
    findById(id: string): Promise<Notification | null>
}