import { PrismaTaskRepository } from "@/adapters/database/prisma/task/prisma-task-repository.js";
import { DeleteTaskUseCase } from "@/core/use-case/task-use-case/delete-task-use-case.js";

export class MakeDeleteTaskUseCaseFactory{
    public static build(){
        const repository = new PrismaTaskRepository()
        const useCase = new DeleteTaskUseCase(repository)
        return useCase
    }
}