import { PrismaUserRepository } from "adapters/database/prisma/user/prisma-user-repository.js";
import { FindUserByEmailUseCase } from "core/use-case/user-use-case/find-user-by-email-use-case.js";

export class MakeFindUserByEmailFactory{
    public static build(){
        const repository = new PrismaUserRepository()
        const useCase = new FindUserByEmailUseCase(repository)
        return useCase
    }
}