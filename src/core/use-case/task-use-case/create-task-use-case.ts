import { Task } from "@/core/entities/task-entitie.js";
import { EventDispatcher } from "@/core/events/event-dispatcher.js";
import { TaskCreatedEvent } from "@/core/events/task-created-event.js";
import { InvalidPropertiesException } from "@/core/exceptions/validation/InvalidPropertiesException.js";
import { CreateTasksUsersFactory } from "@/core/factory/tasks-users-use-case-factory/create-tasks-users-factory.js";
import { TaskRepository } from "@/core/repository/contracts/task-repository.js";
import { CreateTaskPayload } from "@/core/types/task-types.js";

export class CreateTaskUseCase {
  constructor(
    private readonly repository: TaskRepository,
    private readonly dispatcher: EventDispatcher,
  ) {}
  public async execute(payload: CreateTaskPayload) {
    if (!payload.description || !payload.summary || !payload.type) {
      throw new InvalidPropertiesException();
    }
    const newTask = Task.build({
      summary: payload.summary,
      description: payload.description,
      type: payload.type,
      createdAt: payload.createdAt ?? new Date(),
      userId: payload?.userId,
    });
    await this.repository.create(newTask);

    const event = new TaskCreatedEvent(
      newTask.getId(),
      newTask.getSummary(),
      newTask.getUserId(),
      payload.assigneeId,
    );

    const tasksUsersRepository = CreateTasksUsersFactory.build();

    if (payload.assigneeId && payload.assigneeId.length > 0) {
      await Promise.all(
        payload.assigneeId.map((assigneeId) =>
          tasksUsersRepository.execute({
            taskId: newTask.getId(),
            reporterId: payload.userId,
            assigneeId: assigneeId,
          }),
        ),
      );
    }
    this.dispatcher.publish(event);
  }
}
