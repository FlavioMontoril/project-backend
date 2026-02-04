import { NotificationPrismaRepository } from "@/adapters/database/prisma/notification/notification-repository.js";
import { FindAllNotificationsUseCase } from "@/core/use-case/notification-use-case/find-all-notification-use-case.js";
import { FindByIdNotificationUseCase } from "@/core/use-case/notification-use-case/find-by-id-notification-use-case.js";

export class FindByIdNotificationFactory {
    public static build() {
        const repository = new NotificationPrismaRepository();
        return new FindByIdNotificationUseCase(repository);
    }
}