import { Notification } from "@/core/entities/notification-entitie.js";
import { NotificationRepository } from "@/core/repository/contracts/notification-repository.js";

export class FindAllNotificationsUseCase {
    constructor(
        private readonly repository: NotificationRepository
    ) { }

    public async execute(): Promise<Notification[]> {
        return await this.repository.findAll();
    }
}
