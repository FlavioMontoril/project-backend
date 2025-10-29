import { PrismaTaskRepository } from "adapters/database/prisma/task/prisma-task-repository.js";
import { CreateTaskUseCase } from "core/use-case/task-use-case/create-task-use-case.js";

export class MakeCreateTaskUseCaseFactory{
    public static build(){
        const repository = new PrismaTaskRepository()
        const useCase = new CreateTaskUseCase(repository)
        return useCase;
    }
}