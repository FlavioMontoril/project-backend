import { TasksUsersRepository } from "@/core/repository/contracts/tasks-users-repository.js";

export class FindAllTasksUsersUseCase {
  constructor(private readonly tasksUsersRepository: TasksUsersRepository) {}
  public async execute() {}
}
