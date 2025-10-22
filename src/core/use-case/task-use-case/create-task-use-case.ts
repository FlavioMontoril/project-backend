import { Task } from "core/entities/task-entitie.js";
import { InvalidPropertiesException } from "core/exceptions/InvalidPropertiesException.js";
import type { TaskRepository } from "core/repository/contracts/task-repository.js";
import { TaskStatus, type TaskData } from "core/types/task-types.js";

export class CreateTaskUseCase{
    constructor(private readonly repository: TaskRepository){}
    public async execute(payload: TaskData){
        if(!payload.description || !payload.reporter || !payload.status || !payload.summary){
            throw new InvalidPropertiesException()
        }
        const newTask = Task.build({
            summary: payload.summary,
            description: payload.description,
            assignee: payload.assignee ?? null,
            reporter: payload.reporter,
            type: payload.type,
            status: payload.status ?? TaskStatus.OPEN,
            createdAt: payload.createdAt,
            updatedAt: null,
            userId: payload.userId ?? undefined
        })
        await this.repository.create(newTask)
    }
}