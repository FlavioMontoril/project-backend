import { ResourceNotFoundException } from "core/exceptions/ResourceNotFoundException.js";
import { UserRepository } from "core/repository/contracts/user-repository.js";

export class DeleteUserUseCase{
    constructor(private readonly repository: UserRepository){}
    public async execute(id: string){
        const user = await this.repository.findById(id)
        if(!user){
            throw new ResourceNotFoundException()
        }
        await this.repository.delete(id)
    }
}