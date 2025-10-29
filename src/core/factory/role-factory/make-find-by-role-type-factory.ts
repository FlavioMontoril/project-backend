import { PrismaRoleRepository } from "adapters/database/prisma/role/prisma-role-repository.js";
import { FindByRoleTypeUseCase } from "core/use-case/role-use-case/find-by-role-type-use-case.js";

export class MakeFindByRoleTypeFactory{
    public static build(){
        const repository = new PrismaRoleRepository()
        const useCase = new FindByRoleTypeUseCase(repository)
        return useCase
    }
}