import { PrismaRoleRepository } from "@/adapters/database/prisma/role/prisma-role-repository.js";
import { PrismaUserRepository } from "@/adapters/database/prisma/user/prisma-user-repository.js";
import { NotificatioRecipientsResolverUseCase } from "@/core/use-case/notification-recipients-use-case/notification-recipients-resolver-use-case.js";

export class NotificatioRecipientsResolverFactory {
    public static build() {
        const userRepository = new PrismaUserRepository();
        const roleRepository = new PrismaRoleRepository();
        return new NotificatioRecipientsResolverUseCase(userRepository, roleRepository);
    }
}