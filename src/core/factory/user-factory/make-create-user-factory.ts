import { PrismaRoleRepository } from "@/adapters/database/prisma/role/prisma-role-repository.js";
import { PrismaUserRepository } from "@/adapters/database/prisma/user/prisma-user-repository.js";
import { CreateUserUseCase } from "@/core/use-case/user-use-case/create-use-case.js";

export class MakeCreateUserFactory {
  public static build() {
    const userRepository = new PrismaUserRepository()
    const roleRepository = new PrismaRoleRepository();
    const useCase = new CreateUserUseCase(userRepository, roleRepository)
    return useCase
  }
}