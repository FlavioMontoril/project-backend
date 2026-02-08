import { InvalidOperationException } from "@/core/exceptions/domain/InvalidOperationException.js";
import { UnauthorizedActionException } from "@/core/exceptions/domain/UnauthorizedActionException.js";
import { ResourceNotFoundException } from "@/core/exceptions/resource/ResourceNotFoundException.js";
import { TaskRepository } from "@/core/repository/contracts/task-repository.js";
import { TaskStatus, UpdateTaskPayload } from "@/core/types/task-types.js";

export class UpdateTaskUseCase {
    constructor(private readonly repository: TaskRepository) { }
    public async execute(id: string, payload: UpdateTaskPayload, userId: string) {
        const task = await this.repository.findById(id)
        if (!task) {
            throw new ResourceNotFoundException()
        }
        if (task.getStatus() === TaskStatus.DONE) {
            throw new InvalidOperationException()
        }
        if (task.getUserId() !== userId) {
            throw new UnauthorizedActionException()
        }

        if (task.getStatus() === null) {
            throw new InvalidOperationException()
        }

        if (payload.summary != undefined) task.setSummary(payload.summary)
        if (payload.description != undefined) task.setDescription(payload.description)
        if (payload.status != undefined) task.setStatus(payload.status)
        if (payload.type != undefined) task.setType(payload.type)
        if (payload.status != undefined) task.setStatus(payload.status)

        task.setUpdatedAt()

        return await this.repository.update(task)
    }
}