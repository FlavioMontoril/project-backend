import { PrismaRoleRepository } from "adapters/database/prisma/role/prisma-role-repository.js";
import { FindAllRoleUseCase } from "core/use-case/role-use-case/find-all-roles-use-case.js";

export abstract class MakeFindAllRolesFactory{
    public static make(){
        const repository = new PrismaRoleRepository()
        const useCase = new FindAllRoleUseCase(repository)
        return useCase
    }
}