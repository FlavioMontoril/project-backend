import { PrismaTaskRepository } from "@/adapters/database/prisma/task/prisma-task-repository.js";
import { CreateTasksUsersUseCase } from "@/core/use-case/tasks-users-use-case/create-tasks-users-use-case.js";

export class CreateTasksUsersFactory{
    public static build(){
        //ALTERAR PARA PRISMA TASKS USERS
        const repository = new PrismaTaskRepository();
        return new CreateTasksUsersUseCase(repository);
    }
}