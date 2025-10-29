import { PrismaUserRepository } from "adapters/database/prisma/user/prisma-user-repository.js";
import { DeleteUserUseCase } from "core/use-case/user-use-case/delete-use-use-case.js";

export class MakeDeleteUser{
    public static build(){
        const repository = new PrismaUserRepository()
        const useCase = new DeleteUserUseCase(repository)
        return useCase 
    }
}