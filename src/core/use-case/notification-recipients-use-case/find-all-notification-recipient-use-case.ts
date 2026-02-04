import { NotificationRecipient } from "@/core/entities/notification-recipient-entity.js";
import { NotificationRecipientRepository } from "@/core/repository/contracts/notification-recipient-repository.js";

export class FindAllNotificationRecipientsByUserUseCase {
    constructor(
        private readonly repository: NotificationRecipientRepository
    ) { }

    public async execute(userId: string): Promise<NotificationRecipient[]> {
        if (!userId) {
            return [];
        }

        return await this.repository.findByUserId(userId);
    }
}
