import { UnauthorizedActionException } from "@/core/exceptions/domain/UnauthorizedActionException.js";
import { ResourceNotFoundException } from "@/core/exceptions/resource/ResourceNotFoundException.js";
import { NotificationRecipientRepository } from "@/core/repository/contracts/notification-recipient-repository.js";

export class MarkAsReadNotificationUseCase {
    constructor(private readonly notificationRepository: NotificationRecipientRepository) { }
    public async execute({ recipientId, userId }: { recipientId: string, userId: string }) {
        const recipient = await this.notificationRepository.findById(recipientId);
        if (!recipient) throw new ResourceNotFoundException();

        if (recipient.getUserId() !== userId) throw new UnauthorizedActionException();

        recipient.markAsRead();
        await this.notificationRepository.save(recipient);
    }
}