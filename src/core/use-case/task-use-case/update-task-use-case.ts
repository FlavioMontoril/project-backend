import { InvalidOperationException } from "@/core/exceptions/domain/InvalidOperationException.js";
import { ResourceNotFoundException } from "@/core/exceptions/resource/ResourceNotFoundException.js";
import { TaskRepository } from "@/core/repository/contracts/task-repository.js";
import { TaskStatus, UpdateTaskPayload } from "@/core/types/task-types.js";

export class UpdateTaskUseCase {
    constructor(private readonly repository: TaskRepository) { }
    public async execute(id: string, payload: UpdateTaskPayload) {
        const task = await this.repository.findById(id)
        if (!task) {
            throw new ResourceNotFoundException()
        }
        if (task.getStatus() === TaskStatus.DONE) {
            throw new InvalidOperationException()
        }

        if (payload.summary != undefined) task.setSummary(payload.summary)
        if (payload.description != undefined) task.setDescription(payload.description)
        if (payload.assignee != undefined) task.setAssignee(payload.assignee)
        if (payload.reporter != undefined) task.setReporter(payload.reporter)
        if (payload.type) task.setType(payload.type)
        if (payload.status) task.setStatus(payload.status)
        task.setUpdatedAt()

        const updatedTask = await this.repository.update(task)
        return updatedTask
    }
}