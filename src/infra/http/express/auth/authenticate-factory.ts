import { AuthenticateUseCase } from "application/auth/authenticate-use-case.js";
import { SQLiteRoleRepository } from "core/repository/databases/sqlite-role-repository.js";
import { SQLiteUserRepository } from "core/repository/databases/sqlite-user-repository.js";

export abstract class MakeUserWithRoleFactory{
    public static make(){
        console.log("Chegou aqui")
        const userRepository = new SQLiteUserRepository()
        const roleRepository = new SQLiteRoleRepository()
        const userWithRoleUseCase = new AuthenticateUseCase(userRepository, roleRepository)
        return userWithRoleUseCase
    }
}