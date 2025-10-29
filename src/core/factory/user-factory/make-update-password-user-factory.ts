import { PrismaUserRepository } from "adapters/database/prisma/user/prisma-user-repository.js";
import { UpdatePasswordUserUseCase } from "core/use-case/user-use-case/update-password-user-use-case.js";

export class MakeUpdatePasswordUserFactory{
    public static build(){
        const repository = new PrismaUserRepository()
        const useCase = new UpdatePasswordUserUseCase(repository)
        return useCase
    }
}