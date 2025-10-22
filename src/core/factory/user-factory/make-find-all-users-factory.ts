import { PrismaUserRepository } from "adapters/database/prisma/user/prisma-user-repository.js";
import { SQLiteUserRepository } from "core/repository/databases/sqlite-user-repository.js";
import { FindAllUsersUseCase } from "core/use-case/user-use-case/find-all-users-use-case.js";

export abstract class MakeFindAllUsersFactory{
    public static make(){
        const repository = new PrismaUserRepository()
        const useCase = new FindAllUsersUseCase(repository)
        return useCase
    }
}