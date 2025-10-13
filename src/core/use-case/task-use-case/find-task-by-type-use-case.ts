import { ResourceNotFoundException } from "core/exceptions/ResourceNotFoundException.js";
import type { TaskRepository } from "core/repository/contracts/task-repository.js";
import type { TaskType } from "core/types/task-types.js";

export class FindTaskByTypeUseCase{
    constructor(private readonly repository: TaskRepository){}
    public async execute(type: TaskType){
        const tasks = await this.repository.findByType(type)
      
        if(!tasks){
            throw new ResourceNotFoundException()
        }

        return tasks
    }
}