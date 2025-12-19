import { PrismaUserRepository } from "@/adapters/database/prisma/user/prisma-user-repository.js";
import { FindUserByIdUseCase } from "@/core/use-case/user-use-case/find-user-by-id-use-case.js";

export class MakeFindUserById{
    public static build(){
        const repository = new PrismaUserRepository()
        const useCase = new FindUserByIdUseCase(repository)
        return useCase
    }
}