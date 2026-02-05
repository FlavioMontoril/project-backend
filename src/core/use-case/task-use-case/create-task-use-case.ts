import { Task } from "@/core/entities/task-entitie.js";
import { InvalidPropertiesException } from "@/core/exceptions/validation/InvalidPropertiesException.js";
import { CreateTasksUsersFactory } from "@/core/factory/tasks-users-use-case-factory/create-tasks-users-factory.js";
import { TaskRepository } from "@/core/repository/contracts/task-repository.js";
import { CreateTaskPayload, TaskStatus } from "@/core/types/task-types.js";

export class CreateTaskUseCase {
  constructor(
    private readonly repository: TaskRepository,
) {}
  public async execute(payload: CreateTaskPayload) {
    if (!payload.description || !payload.summary || !payload.type) {
      throw new InvalidPropertiesException();
    }
    const newTask = Task.build({
      summary: payload.summary,
      description: payload.description,
      type: payload.type,
      status: payload.status ?? TaskStatus.OPEN,
      createdAt: payload.createdAt ?? new Date(),
      userId: payload?.userId,
    });
    await this.repository.create(newTask);

    const newTasksUsers = {
      taskId: newTask.getId().toString(),
      reporterId: payload.userId,
      assigneeId: payload.assigneeId,
      status: payload.status,
    };
    const tasksUsersRepository = CreateTasksUsersFactory.build();
    await tasksUsersRepository.execute(newTasksUsers);
  }
}
