import { Notification } from "@/core/entities/notification-entitie.js";
import { Notification as NotificationPrisma } from "@/generated/prisma/index.js"

export class NotificationMapper {
    public static toPersistence(entity: Notification): NotificationPrisma {
        return {
            id: entity.getId(),
            content: entity.getContent(),
            triggeredId: entity.getTriggeredId(),
            entityType: entity.getEntityType(),
            createdAt: entity.getCreatedAt(),
        }
    }

    public static toDomain(raw: NotificationPrisma): Notification {
        return Notification.build({
            id: raw.id,
            content: raw.content,
            triggeredId: raw.triggeredId,
            entityType: raw.entityType,
            createdAt: raw.createdAt,
        })
    }
}