import { PrismaTaskRepository } from "adapters/database/prisma/task/prisma-task-repository.js";
import { FindAllTasksUseCase } from "core/use-case/task-use-case/find-all-tasks-use-case.js";

export class MakeFindAllTasksUseCaseFactory{
    public static build(){
        const repository = new PrismaTaskRepository()
        const useCase = new FindAllTasksUseCase(repository)
        return useCase
    }
}