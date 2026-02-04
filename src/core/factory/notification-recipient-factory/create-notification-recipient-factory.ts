import { NotificationRecipientPrismaRepository } from "@/adapters/database/prisma/notification-recipient/notification-recipient-repository.js";
import { CreateNotificationRecipientUseCase } from "@/core/use-case/notification-recipients-use-case/create-notification-recipient-use-case.js";

export class CreateNotificationRecipientFactory {
    public static build() {
        const repository = new NotificationRecipientPrismaRepository();
        return new CreateNotificationRecipientUseCase(repository);
    }
}
