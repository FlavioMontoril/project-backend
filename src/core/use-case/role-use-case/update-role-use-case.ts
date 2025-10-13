import { ResourceNotFoundException } from "core/exceptions/ResourceNotFoundException.js";
import type { RoleRepository } from "core/repository/contracts/role-repository.js";
import type { RoleOptions } from "core/types/role-types.js";
interface UpdateRequestDto{
    name?: RoleOptions,
    description?: string,
}
export class UpdateRoleUseCase{
    constructor(private readonly repository: RoleRepository){}
    public async execute(id: string, payload: UpdateRequestDto){
        const role = await this.repository.findById(id)
        if(!role){
            throw new ResourceNotFoundException()
        }
        role
        .setName(payload.name)
        .setDescription(payload.description)
        
        const updatedRole = await this.repository.update(role)
        return updatedRole
    }
}