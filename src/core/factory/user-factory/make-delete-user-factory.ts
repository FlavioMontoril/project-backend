import { PrismaUserRepository } from "adapters/database/prisma/user/prisma-user-repository.js";
import { SQLiteUserRepository } from "core/repository/databases/sqlite-user-repository.js";
import { DeleteUserUseCase } from "core/use-case/user-use-case/delete-use-use-case.js";

export abstract class MakeDeleteUser{
    public static make(){
        const repository = new PrismaUserRepository()
        const useCase = new DeleteUserUseCase(repository)
        return useCase 
    }
}