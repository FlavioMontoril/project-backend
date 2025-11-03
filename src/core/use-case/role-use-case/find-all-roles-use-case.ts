import { ResourceNotFoundException } from "core/exceptions/ResourceNotFoundException.js";
import { RoleRepository } from "core/repository/contracts/role-repository.js";

export class FindAllRoleUseCase {
    constructor(private readonly repository: RoleRepository) { }
    public async execute() {
        const roles = await this.repository.findAll()
        if (!roles) throw new ResourceNotFoundException()

        return roles
    }
}