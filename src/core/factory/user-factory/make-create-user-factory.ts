import { SQLiteRoleRepository } from "core/repository/databases/sqlite-role-repository.js";
import { SQLiteUserRepository } from "core/repository/databases/sqlite-user-repository.js";
import { CreateUserUseCase } from "core/use-case/user-use-case/create-use-case.js";

export abstract class MakeCreateUserFactory{
    public static make(){
        const userRepository = new SQLiteUserRepository()
          const roleRepository = new SQLiteRoleRepository();
        const useCase = new CreateUserUseCase(userRepository, roleRepository)
        return useCase
    }
}