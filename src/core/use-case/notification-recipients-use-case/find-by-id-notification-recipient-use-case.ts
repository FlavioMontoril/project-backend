import { NotificationRecipient } from "@/core/entities/notification-recipient-entity.js";
import { NotificationRecipientRepository } from "@/core/repository/contracts/notification-recipient-repository.js";

export class FindNotificationRecipientByIdUseCase {
    constructor(
        private readonly repository: NotificationRecipientRepository
    ) { }

    public async execute(id: string): Promise<NotificationRecipient | null> {
        if (!id) {
            return null;
        }

        return await this.repository.findById(id);
    }
}
