import { SQLiteTaskRepository } from "core/repository/databases/sqlite-task-repository.js";
import { FindTaskByIdUseCase } from "core/use-case/task-use-case/find-task-by-id-use-case.js";

export abstract class MakeFindByIdTaskFactory{
    public static make(){
        const repository = new SQLiteTaskRepository()
        const useCase = new FindTaskByIdUseCase(repository)
        return useCase
    }
}