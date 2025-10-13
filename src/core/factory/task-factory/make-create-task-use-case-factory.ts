import { SQLiteTaskRepository } from "core/repository/databases/sqlite-task-repository.js";
import { CreateTaskUseCase } from "core/use-case/task-use-case/create-task-use-case.js";

export abstract class MakeCreateTaskUseCaseFactory{
    public static make(){
        const repository = new SQLiteTaskRepository()
        const useCase = new CreateTaskUseCase(repository)
        return useCase;
    }
}