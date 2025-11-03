import { ResourceNotFoundException } from "core/exceptions/ResourceNotFoundException.js";
import { TaskRepository } from "core/repository/contracts/task-repository.js";

export class FindTaskByIdUseCase{
    constructor(private readonly repository: TaskRepository){}
    public async execute(id: string) {
        const task = await this.repository.findById(id)

        if(!task){
            throw new ResourceNotFoundException()
        }
        return task
    }
}