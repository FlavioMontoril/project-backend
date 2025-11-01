import { PrismaUserRepository } from "adapters/database/prisma/user/prisma-user-repository.js";
import { findAllUsersWithHasTasksOpenUseCase } from "core/use-case/user-use-case/find-all-users-withHas-tasks-open-use-case.js";

export class MakeFindAllUsersWithHasTasksOpenFactory{
    public static build(){
        const userRepository = new PrismaUserRepository()
        const useCase = new findAllUsersWithHasTasksOpenUseCase(userRepository)
        return useCase
    }
}