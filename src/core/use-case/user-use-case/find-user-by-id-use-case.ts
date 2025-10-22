import { ResourceNotFoundException } from "core/exceptions/ResourceNotFoundException.js";
import type { UserRepository } from "core/repository/contracts/user-repository.js";

export class FindUserByIdUseCase{
    constructor(private readonly repository: UserRepository){}
    public async execute(id: string){
        const user = await this.repository.findById(id)
        console.log("USE CASE", user)
        
        if(!user) throw new ResourceNotFoundException()
            
            return user
        
    }
}