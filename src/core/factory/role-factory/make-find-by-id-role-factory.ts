import { PrismaRoleRepository } from "adapters/database/prisma/role/prisma-role-repository.js";
import { SQLiteRoleRepository } from "core/repository/databases/sqlite-role-repository.js";
import { FindByIdRoleUseCase } from "core/use-case/role-use-case/find-by-id-role-use-case.js";

export abstract class MakeFindByIdRoleFactory{
    public static make(){
        const repository = new PrismaRoleRepository()
        const useCase = new FindByIdRoleUseCase(repository)
        return useCase
    }
}