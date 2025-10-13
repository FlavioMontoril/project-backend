import { SQLiteRoleRepository } from "core/repository/databases/sqlite-role-repository.js";
import { SQLiteUserRepository } from "core/repository/databases/sqlite-user-repository.js";
import { UpdateUserUseCase } from "core/use-case/user-use-case/update-user-use-case.js";

export abstract class MakeUpdateUserFactory{
 public static make(){
    const userRepository = new SQLiteUserRepository()
    const useCase = new UpdateUserUseCase(userRepository)
    return useCase
 }   
}