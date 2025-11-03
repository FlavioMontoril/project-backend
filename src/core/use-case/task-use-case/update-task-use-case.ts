import { InvalidOperationException } from "core/exceptions/InvalidOperationException.js";
import { ResourceNotFoundException } from "core/exceptions/ResourceNotFoundException.js";
import { TaskRepository } from "core/repository/contracts/task-repository.js";
import { TaskStatus, TaskType } from "core/types/task-types.js";

interface UpdateTaskPayload {
    summary?: string,
    description?: string,
    assignee?: string,
    reporter?: string,
    type?: TaskType,
    status?: TaskStatus,
}
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
        task
        if (payload.summary != undefined) task.setSummary(payload.summary)
        if (payload.description != undefined) task.setDescription(payload.description)
        if (payload.assignee != undefined) task.setAssignee(payload.assignee)
        if (payload.reporter != undefined) task.setReporter(payload.reporter)
        if (payload.type) task.setType(payload.type)
        if (payload.status) task.setStatus(payload.status)

        const updatedTask = await this.repository.update(task)
        return updatedTask
    }
}