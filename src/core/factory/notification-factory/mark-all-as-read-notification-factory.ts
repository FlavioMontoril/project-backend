import { NotificationRecipientPrismaRepository } from "@/adapters/database/prisma/notification-recipient/notification-recipient-repository.js";
import { MarkAllAsReadNotificationUseCase } from "@/core/use-case/notification-use-case/mark-all-as-read-notification-use-case.js";

export class MarkAllAsReadNotificationFactory {
    public static build() {
        const repository = new NotificationRecipientPrismaRepository();
        return new MarkAllAsReadNotificationUseCase(repository)
    }
}