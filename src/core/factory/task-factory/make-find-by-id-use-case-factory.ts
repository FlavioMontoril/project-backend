import { PrismaTaskRepository } from "@/adapters/database/prisma/task/prisma-task-repository.js";
import { FindTaskByIdUseCase } from "@/core/use-case/task-use-case/find-task-by-id-use-case.js";

export class MakeFindByIdTaskFactory{
    public static build(){
        const repository = new PrismaTaskRepository()
        const useCase = new FindTaskByIdUseCase(repository)
        return useCase
    }
}