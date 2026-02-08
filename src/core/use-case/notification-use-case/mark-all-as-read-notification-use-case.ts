import { UnauthorizedActionException } from "@/core/exceptions/domain/UnauthorizedActionException.js";
import { NotificationRecipientRepository } from "@/core/repository/contracts/notification-recipient-repository.js";

export class MarkAllAsReadNotificationUseCase {
    constructor(private readonly notificationRepository: NotificationRecipientRepository) { }
    public async execute({ userId }: { userId: string }) {

        if (!userId) throw new UnauthorizedActionException();

        await this.notificationRepository.markAllAsRead(userId);
    }
}