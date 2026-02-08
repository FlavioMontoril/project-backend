import { NotificationRecipientPrismaRepository } from "@/adapters/database/prisma/notification-recipient/notification-recipient-repository.js";
import { MarkAsReadNotificationUseCase } from "@/core/use-case/notification-use-case/mark-as-read-notification-use-case.js";

export class MarkAsReadNotificationFactory {
    public static build() {
        const repository = new NotificationRecipientPrismaRepository();
        return new MarkAsReadNotificationUseCase(repository)
    }
}