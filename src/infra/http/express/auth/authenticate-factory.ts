import { PrismaRoleRepository } from "adapters/database/prisma/role/prisma-role-repository.js";
import { PrismaUserRepository } from "adapters/database/prisma/user/prisma-user-repository.js";
import { AuthenticateUseCase } from "application/auth/authenticate-use-case.js";

export abstract class MakeUserWithRoleFactory{
    public static make(){
        console.log("Chegou aqui")
        const userRepository = new PrismaUserRepository()
        const roleRepository = new PrismaRoleRepository()
        const userWithRoleUseCase = new AuthenticateUseCase(userRepository, roleRepository)
        return userWithRoleUseCase
    }
}