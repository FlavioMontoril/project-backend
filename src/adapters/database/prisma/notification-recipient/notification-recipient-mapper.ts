import { NotificationRecipient } from "@/core/entities/notification-recipient-entity.js";
import { NotificationRecipient as NotificationRecipientPrisma } from "@/generated/prisma/index.js";
import { Prisma } from "@prisma/client";

export class NotificationRecipientMapper {
    public static toPersistence(entity: NotificationRecipient): NotificationRecipientPrisma {
        return {
            id: entity.getId(),
            notificationId: entity.getNotificationId(),
            userId: entity.getUserId(),
            readAt: entity.getReadAt(),
            createdAt: entity.getCreatedAt(),
        };
    }

    public static toDomain(raw: NotificationRecipientPrisma): NotificationRecipient {
        return NotificationRecipient.build({
            id: raw.id,
            notificationId: raw.notificationId,
            userId: raw.userId,
            readAt: raw.readAt,
            createdAt: raw.createdAt,
        });
    }
}
