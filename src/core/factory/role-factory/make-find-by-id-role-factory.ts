import { PrismaRoleRepository } from "@/adapters/database/prisma/role/prisma-role-repository.js";
import { FindByIdRoleUseCase } from "@/core/use-case/role-use-case/find-by-id-role-use-case.js";

export class MakeFindByIdRoleFactory {
    public static build() {
        const roleRepository = new PrismaRoleRepository()
        const useCase = new FindByIdRoleUseCase(roleRepository)
        return useCase
    }
}