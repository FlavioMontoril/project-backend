import { ResourceNotFoundException } from "core/exceptions/ResourceNotFoundException.js";
import type { RoleRepository } from "core/repository/contracts/role-repository.js";

export class DeleteRoleUseCase{
    constructor(private  readonly repository: RoleRepository){}
    public async execute(id: string){
        const role = await this.repository.findById(id)
        if(!role) {
            throw new ResourceNotFoundException()
        }
        await this.repository.delete(id)
    }
}''