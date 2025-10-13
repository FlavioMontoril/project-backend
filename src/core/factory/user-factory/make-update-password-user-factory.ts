import { SQLiteUserRepository } from "core/repository/databases/sqlite-user-repository.js";
import { UpdatePasswordUserUseCase } from "core/use-case/user-use-case/update-password-user-use-case.js";

export abstract class MakeUpdatePasswordUserFactory{
    public static make(){
        const repository = new SQLiteUserRepository()
        const useCase = new UpdatePasswordUserUseCase(repository)
        return useCase
    }
}