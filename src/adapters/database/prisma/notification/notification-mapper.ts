import { Notification } from "@/core/entities/notification-entity.js";
import { Notification as PrismaNotification } from "@/generated/prisma/index.js";
import { NotificationType as PrismaNotificationType } from "@/generated/prisma/index.js";
import { NotificationType as DomainNotificationType } from "@/core/types/notification-types.js";

export class NotificationMapper {

  public static toDomain(raw: PrismaNotification): Notification {
    return Notification.build({
      id: raw.userId,
      userId: raw.userId,
      title: raw.title,
      message: raw.message,
      type: raw.type as DomainNotificationType,
      entityId: raw.entityId ?? undefined,
      read: raw.read,
      createdAt: raw.createdAt,
    });
  }

  public static toPersistence(entity: Notification): PrismaNotification {
    return {
      id: entity.getUserId(),
      userId: entity.getUserId(),
      title: entity.getTitle(),
      message: entity.getMessage(),
      type: entity.getType() as PrismaNotificationType,
      entityId: entity.getEntityId() ?? null,
      read: entity.getRead(),
      createdAt: entity.getCreatedAt(),
    };
  }
}
