import { PrismaTaskRepository } from "adapters/database/prisma/task/prisma-task-repository.js";
import { SQLiteTaskRepository } from "core/repository/databases/sqlite-task-repository.js";
import { DeleteTaskUseCase } from "core/use-case/task-use-case/delete-task-use-case.js";

export abstract class MakeDeleteTaskUseCaseFactory{
    public static make(){
        const repository = new PrismaTaskRepository()
        const useCase = new DeleteTaskUseCase(repository)
        return useCase
    }
}