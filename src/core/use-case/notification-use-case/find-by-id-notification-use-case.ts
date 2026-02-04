import { Notification } from "@/core/entities/notification-entitie.js";
import { NotificationRepository } from "@/core/repository/contracts/notification-repository.js";

export class FindByIdNotificationUseCase {
    constructor(
        private readonly repository: NotificationRepository
    ) { }

    public async execute(id: string): Promise<Notification | null> {
        if (!id) {
            return null;
        }

        return await this.repository.findById(id);
    }
}
