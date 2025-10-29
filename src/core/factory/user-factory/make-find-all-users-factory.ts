import { PrismaUserRepository } from "adapters/database/prisma/user/prisma-user-repository.js";
import { FindAllUsersUseCase } from "core/use-case/user-use-case/find-all-users-use-case.js";

export class MakeFindAllUsersFactory{
    public static build(){
        const repository = new PrismaUserRepository()
        const useCase = new FindAllUsersUseCase(repository)
        return useCase
    }
}