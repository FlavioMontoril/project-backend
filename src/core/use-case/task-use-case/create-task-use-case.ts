import { Task } from "@/core/entities/task-entitie.js";
import { InvalidPropertiesException } from "@/core/exceptions/validation/InvalidPropertiesException.js";
import { TaskRepository } from "@/core/repository/contracts/task-repository.js";
import { CreateTaskPayload, TaskStatus, type TaskData } from "@/core/types/task-types.js";

export class CreateTaskUseCase {
    constructor(private readonly repository: TaskRepository) { }
    public async execute(payload: CreateTaskPayload) {
        if (!payload.description || !payload.summary || !payload.type) {
            throw new InvalidPropertiesException()
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
    }
}