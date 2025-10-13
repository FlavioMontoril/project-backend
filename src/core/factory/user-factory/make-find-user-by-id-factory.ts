import { SQLiteUserRepository } from "core/repository/databases/sqlite-user-repository.js";
import { FindUserByIdUseCase } from "core/use-case/user-use-case/find-user-by-id-use-case.js";

export abstract class MakeFindUserById{
    public static make(){
        const repository = new SQLiteUserRepository()
        const useCase = new FindUserByIdUseCase(repository)
        return useCase
    }
}