import { Task } from "@/core/entities/task-entitie.js";
import { EventDispatcher } from "@/core/events/event-dispatcher.js";
import { TaskCreatedEvent } from "@/core/events/task-created-event.js";
import { ResourceAlreadyExistsException } from "@/core/exceptions/resource/ResourceAlreadyExistsException.js";
import { InvalidPropertiesException } from "@/core/exceptions/validation/InvalidPropertiesException.js";
import { CreateTasksUsersFactory } from "@/core/factory/tasks-users-use-case-factory/create-tasks-users-factory.js";
import { TaskRepository } from "@/core/repository/contracts/task-repository.js";
import { CreateTaskPayload, TaskStatus } from "@/core/types/task-types.js";

export class CreateTaskUseCase {
  constructor(
    private readonly repository: TaskRepository,
    private readonly dispatcher: EventDispatcher,
  ) { }
  public async execute(payload: CreateTaskPayload) {
    if (!payload.description || !payload.summary || !payload.type || !payload.code) {
      throw new InvalidPropertiesException();
    }
    const task = await this.repository.findByCode(payload.code);
    if (task) throw new ResourceAlreadyExistsException();

    const hasAssignee =
      Array.isArray(payload.assigneeId) && payload.assigneeId.length > 0;

    const status = hasAssignee
      ? TaskStatus.ASSIGNED
      : payload.status ?? TaskStatus.OPEN;

    const newTask = Task.build({
      code: payload.code,
      summary: payload.summary,
      description: payload.description,
      type: payload.type,
      status,
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
