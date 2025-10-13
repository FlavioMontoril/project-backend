import { ResourceNotFoundException } from "core/exceptions/ResourceNotFoundException.js";
import type { RoleRepository } from "core/repository/contracts/role-repository.js";
import type { RoleOptions } from "core/types/role-types.js";

export class FindByRoleTypeUseCase{
    constructor(private readonly repository: RoleRepository){}
    public async execute(roleType: RoleOptions){
        const role = await this.repository.findByOptions(roleType)
        if(!role){
            throw new ResourceNotFoundException()
        }
        return role
    }
}