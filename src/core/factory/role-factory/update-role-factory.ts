import { PrismaRoleRepository } from "@/adapters/database/prisma/role/prisma-role-repository.js";
import { UpdateRoleUseCase } from "@/core/use-case/role-use-case/update-role-use-case.js";

export class MakeUpdateFactory{
    public static build(){
    const repository = new PrismaRoleRepository()
    const useCase = new UpdateRoleUseCase(repository)
    return useCase
    }
}