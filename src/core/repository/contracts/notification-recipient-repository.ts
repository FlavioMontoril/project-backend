import { NotificationRecipient } from "@/core/entities/notification-recipient-entity.js";

export interface NotificationRecipientRepository {
    create(recipient: NotificationRecipient): Promise<void>;
    findById(id: string): Promise<NotificationRecipient | null>;
    findByUserId(userId: string): Promise<NotificationRecipient[]>;
}
