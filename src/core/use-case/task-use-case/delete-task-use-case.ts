import { InvalidOperationException } from "core/exceptions/InvalidOperationException.js";
import { ResourceNotFoundException } from "core/exceptions/ResourceNotFoundException.js";
import type { TaskRepository } from "core/repository/contracts/task-repository.js";
import { TaskStatus } from "core/types/task-types.js";

export class DeleteTaskUseCase{
    constructor(private readonly repository: TaskRepository){}
    public async execute(id: string){
        const task = await this.repository.findById(id)

        if(!task){
            throw new ResourceNotFoundException()
        }
        if(task.getStatus() === TaskStatus.DONE){
            throw new InvalidOperationException()
        }
        await this.repository.delete(id)
    }
}