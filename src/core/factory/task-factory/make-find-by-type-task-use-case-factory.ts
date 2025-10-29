import { PrismaTaskRepository } from "adapters/database/prisma/task/prisma-task-repository.js";
import { FindTaskByTypeUseCase } from "core/use-case/task-use-case/find-task-by-type-use-case.js";

export class MakeFindByTypeTaskUsCase{
    public static build(){
        const repository = new PrismaTaskRepository()
        const useCase = new FindTaskByTypeUseCase(repository)
        return useCase
    }
}