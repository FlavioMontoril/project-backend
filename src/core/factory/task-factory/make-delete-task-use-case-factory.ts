import { SQLiteTaskRepository } from "core/repository/databases/sqlite-task-repository.js";
import { DeleteTaskUseCase } from "core/use-case/task-use-case/delete-task-use-case.js";

export abstract class MakeDeleteTaskUseCase{
    public static make(){
        const repository = new SQLiteTaskRepository()
        const useCase = new DeleteTaskUseCase(repository)
        return useCase
    }
}