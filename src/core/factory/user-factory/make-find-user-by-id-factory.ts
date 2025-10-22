import { PrismaUserRepository } from "adapters/database/prisma/user/prisma-user-repository.js";
import { FindUserByIdUseCase } from "core/use-case/user-use-case/find-user-by-id-use-case.js";

export abstract class MakeFindUserById{
    public static make(){
        const repository = new PrismaUserRepository()
        const useCase = new FindUserByIdUseCase(repository)
        return useCase
    }
}