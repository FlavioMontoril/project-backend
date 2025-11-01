import { PrismaRoleRepository } from "adapters/database/prisma/role/prisma-role-repository.js";
import { findAllRoleByIdUseCase } from "core/use-case/role-use-case/find-all-role-by-id-use-case.js";

export class FindAllRoleByIdFactory{
    public static build(){
        const roleRepository = new PrismaRoleRepository()
        const useCase = new findAllRoleByIdUseCase(roleRepository)
        return useCase
    }
}