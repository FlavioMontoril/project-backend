import { PrismaRoleRepository } from "adapters/database/prisma/role/prisma-role-repository.js";
import { CreateRoleUseCase } from "core/use-case/role-use-case/create-role-use-case.js";

export class MakeCreateRoleFactory{
    public static build(){
        const repository = new PrismaRoleRepository()
        const useCase = new CreateRoleUseCase(repository)
        return useCase
    }
}