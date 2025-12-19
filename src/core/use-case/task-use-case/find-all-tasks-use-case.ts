import { ResourceNotFoundException } from "@/core/exceptions/ResourceNotFoundException.js";
import { TaskRepository } from "@/core/repository/contracts/task-repository.js";

export class FindAllTasksUseCase{
    constructor(private readonly repository: TaskRepository){}
    public async execute(){
        const tasks = await this.repository.findAll()
        if(!tasks){
            throw new ResourceNotFoundException()
        }
        return tasks
    }
}