import { NotificationPrismaRepository } from "@/adapters/database/prisma/notification/notification-repository.js";
import { CreateNotificationUseCase } from "@/core/use-case/notification-use-case/create-notification-use-case.js";

export class CreateNotificationFactory {
  public static build() {
    const repository = new NotificationPrismaRepository();
    return new CreateNotificationUseCase(repository);
  }
}
