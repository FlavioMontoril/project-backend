import { Task } from "@/core/entities/task-entitie.js";
import { EventDispatcher } from "@/core/events/event-dispatcher.js";
import { TaskCreatedEvent } from "@/core/events/task-created-event.js";
import { ResourceAlreadyExistsException } from "@/core/exceptions/resource/ResourceAlreadyExistsException.js";
import { InvalidPropertiesException } from "@/core/exceptions/validation/InvalidPropertiesException.js";
import { TaskRepository } from "@/core/repository/contracts/task-repository.js";
import { CreateTaskPayload, TaskStatus } from "@/core/types/task-types.js";

export class CreateTaskUseCase {
  constructor(
    private readonly repository: TaskRepository,
    private readonly dispatcher: EventDispatcher,
  ) { }
  public async execute(payload: CreateTaskPayload, userId: string) {
    if (!payload.description || !payload.summary || !payload.type || !payload.code || !payload.assigneeId || !userId ) {
      throw new InvalidPropertiesException();
    }
    const task = await this.repository.findByCode(payload.code);
    if (task) throw new ResourceAlreadyExistsException();

    const newTask = Task.build({
      code: payload.code,
      summary: payload.summary,
      description: payload.description,
      type: payload.type,
      status: TaskStatus.OPEN,
      createdAt: payload.createdAt ?? new Date(),
      reporterId: userId,
      assigneeId: payload.assigneeId,
    });
    await this.repository.create(newTask);

    const event = new TaskCreatedEvent(
      newTask.getId(),
      newTask.getSummary(),
      newTask.getReporterId(),
      payload.assigneeId,
    );

    this.dispatcher.publish(event);
  }
}
