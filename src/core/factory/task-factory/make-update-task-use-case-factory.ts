import { PrismaTaskRepository } from "adapters/database/prisma/task/prisma-task-repository.js";
import { UpdateTaskUseCase } from "core/use-case/task-use-case/update-task-use-case.js";

export class MakeUpdateTaskUseCaseFactory{
    public static build(){
        const repository = new PrismaTaskRepository()
        const useCase = new UpdateTaskUseCase(repository)
        return useCase
    }
}