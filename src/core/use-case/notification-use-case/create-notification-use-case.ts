import { Notification } from "@/core/entities/notification-entitie.js";
import { InvalidPropertiesException } from "@/core/exceptions/validation/InvalidPropertiesException.js";
import { NotificationRepository } from "@/core/repository/contracts/notification-repository.js";

export type CreateNotificationPayload = {
  content: string;
  triggeredId: string;
  entityType?: string;
  createdAt?: Date;
};

export class CreateNotificationUseCase {
  constructor(
    private readonly repository: NotificationRepository
  ) { }

  public async execute(payload: CreateNotificationPayload) {
    if (!payload.content || !payload.triggeredId) {
      throw new InvalidPropertiesException();
    }

    const notification = Notification.build({
      content: payload.content,
      triggeredId: payload.triggeredId,
      entityType: payload.entityType ?? null,
      createdAt: payload.createdAt ?? new Date(),
    });

    await this.repository.create(notification);
  }
}
