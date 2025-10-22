import { PrismaRoleRepository } from "adapters/database/prisma/role/prisma-role-repository.js";
import { DeleteRoleUseCase } from "core/use-case/role-use-case/delete-role-use-case.js";

export abstract class MakeDeleteRoleFactory{
    public static make(){
        const repository = new PrismaRoleRepository()
        const useCase = new DeleteRoleUseCase(repository)
        return useCase
    }
}