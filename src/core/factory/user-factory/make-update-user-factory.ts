import { PrismaUserRepository } from "adapters/database/prisma/user/prisma-user-repository.js";
import { UpdateUserUseCase } from "core/use-case/user-use-case/update-user-use-case.js";

export class MakeUpdateUserFactory{
 public static build(){
    const userRepository = new PrismaUserRepository()
    const useCase = new UpdateUserUseCase(userRepository)
    return useCase
 }   
}