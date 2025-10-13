import { SQLiteTaskRepository } from "core/repository/databases/sqlite-task-repository.js";
import { UpdateTaskUseCase } from "core/use-case/task-use-case/update-task-use-case.js";

export abstract class MakeUpdateTaskUseCaseFactory{
    public static make(){
        const repository = new SQLiteTaskRepository()
        const useCase = new UpdateTaskUseCase(repository)
        return useCase
    }
}