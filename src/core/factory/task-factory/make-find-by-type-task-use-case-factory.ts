import { SQLiteTaskRepository } from "core/repository/databases/sqlite-task-repository.js";
import type { TaskType } from "core/types/task-types.js";
import { FindTaskByTypeUseCase } from "core/use-case/task-use-case/find-task-by-type-use-case.js";

export abstract class MakeFindByTypeTaskUsCase{
    public static make(){
        const repository = new SQLiteTaskRepository()
        const useCase = new FindTaskByTypeUseCase(repository)
        return useCase
    }
}