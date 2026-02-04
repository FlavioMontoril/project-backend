import { NotificationPrismaRepository } from "@/adapters/database/prisma/notification/notification-repository.js";
import { FindAllNotificationsUseCase } from "@/core/use-case/notification-use-case/find-all-notification-use-case.js";

export class FindAllNotificationFactory {
    public static build() {
        const repository = new NotificationPrismaRepository();
        return new FindAllNotificationsUseCase(repository);
    }
}