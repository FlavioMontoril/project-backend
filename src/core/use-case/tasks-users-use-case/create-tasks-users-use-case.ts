import { TasksUsers } from "@/core/entities/tasks-users-entity.js";
import { InvalidOperationException } from "@/core/exceptions/domain/InvalidOperationException.js";
import { ResourceAlreadyExistsException } from "@/core/exceptions/resource/ResourceAlreadyExistsException.js";
import { InvalidPropertiesException } from "@/core/exceptions/validation/InvalidPropertiesException.js";
import { TasksUsersRepository } from "@/core/repository/contracts/tasks-users-repository.js";
import { CreateTasksUsersPayload } from "@/core/types/tasks-users.js";

export class CreateTasksUsersUseCase {
  constructor(private readonly tasksUsersRepository: TasksUsersRepository) {}
  public async execute(
    payload: CreateTasksUsersPayload,
  ): Promise<Record<string, string>[]> {
    if (!payload.reporterId || !payload.assigneeId || !payload.status) {
      throw new InvalidPropertiesException();
    }
    if (payload.reporterId === payload.assigneeId) {
      throw new InvalidOperationException();
    }

    const assignees = Array.isArray(payload.assigneeId)
      ? payload.assigneeId
      : [payload.assigneeId];

    const results: Record<string, string>[] = [];

    for await(const assigneeIds of assignees) {
      const alreadyExists =
        await this.tasksUsersRepository.findByTaskAndAssignee(
          payload.taskId,
          assigneeIds,
        );
      if (alreadyExists) {
        throw new ResourceAlreadyExistsException();
      }

      const newTasksUsers = TasksUsers.build({
        reporterId: payload.reporterId,
        taskId: payload.taskId,
        assigneeId: assigneeIds,
        status: payload.status,
      });

      await this.tasksUsersRepository.save(newTasksUsers);

      results.push({ id: newTasksUsers?.getId() });
    }
    return results;
  }
}
