import { SQLiteTaskRepository } from "core/repository/databases/sqlite-task-repository.js";
import { FindAllTasksUseCase } from "core/use-case/task-use-case/find-all-tasks-use-case.js";

export abstract class MakeFindAllTasksUseCaseFactory{
    public static make(){
        const repository = new SQLiteTaskRepository()
        const useCase = new FindAllTasksUseCase(repository)
        return useCase
    }
}