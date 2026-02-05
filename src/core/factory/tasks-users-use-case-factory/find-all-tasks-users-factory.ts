import { PrismaTasksUsersRepository } from "@/adapters/database/prisma/tasks-users/prisma-tasks-users-repository.js";
import { FindAllTasksUsersUseCase } from "@/core/use-case/tasks-users-use-case/find-all-tasks-users-use-case.js";

export class FindAllTasksUsersFactory {
    public static build() {
        const repository = new PrismaTasksUsersRepository();
        return new FindAllTasksUsersUseCase(repository);
    }
}