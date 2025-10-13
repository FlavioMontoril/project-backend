import { SQLiteUserRepository } from "core/repository/databases/sqlite-user-repository.js";
import { FindUserByEmailUseCase } from "core/use-case/user-use-case/find-user-by-email-use-case.js";

export abstract class MakeFindUserByEmailFactory{
    public static make(){
        const repository = new SQLiteUserRepository()
        const useCase = new FindUserByEmailUseCase(repository)
        return useCase
    }
}