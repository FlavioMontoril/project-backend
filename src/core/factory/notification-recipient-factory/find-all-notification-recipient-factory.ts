import { NotificationRecipientPrismaRepository } from "@/adapters/database/prisma/notification-recipient/notification-recipient-repository.js";
import { FindAllNotificationRecipientsByUserUseCase } from "@/core/use-case/notification-recipients-use-case/find-all-notification-recipient-use-case.js";

export class FindAllNotificationRecipientsByUserFactory {
    public static build() {
        const repository = new NotificationRecipientPrismaRepository();
        return new FindAllNotificationRecipientsByUserUseCase(repository);
    }
}
