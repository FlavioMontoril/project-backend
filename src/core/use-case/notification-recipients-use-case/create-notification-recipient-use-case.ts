import { NotificationRecipient } from "@/core/entities/notification-recipient-entity.js";
import { InvalidPropertiesException } from "@/core/exceptions/validation/InvalidPropertiesException.js";
import { NotificationRecipientRepository } from "@/core/repository/contracts/notification-recipient-repository.js";

export type CreateNotificationRecipientPayload = {
  notificationId: string;
  userId: string;
  createdAt?: Date;
};

export class CreateNotificationRecipientUseCase {
  constructor(
    private readonly repository: NotificationRecipientRepository
  ) {}

  public async execute(payload: CreateNotificationRecipientPayload) {
    if (!payload.notificationId || !payload.userId) {
      throw new InvalidPropertiesException();
    }

    const recipient = NotificationRecipient.build({
      notificationId: payload.notificationId,
      userId: payload.userId,
    });

    await this.repository.create(recipient);
  }
}
