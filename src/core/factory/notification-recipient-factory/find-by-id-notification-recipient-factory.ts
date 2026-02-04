import { NotificationRecipientPrismaRepository } from "@/adapters/database/prisma/notification-recipient/notification-recipient-repository.js";
import { FindNotificationRecipientByIdUseCase } from "@/core/use-case/notification-recipients-use-case/find-by-id-notification-recipient-use-case.js";

export class FindNotificationRecipientByIdFactory {
    public static build() {
        const repository = new NotificationRecipientPrismaRepository();
        return new FindNotificationRecipientByIdUseCase(repository);
    }
}
