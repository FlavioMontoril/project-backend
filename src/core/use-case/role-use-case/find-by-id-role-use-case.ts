import { ResourceNotFoundException } from "@/core/exceptions/resource/ResourceNotFoundException.js";
import { RoleRepository } from "@/core/repository/contracts/role-repository.js";

export class FindByIdRoleUseCase {
    constructor(private readonly repository: RoleRepository) { }
    public async execute(id: string) {
        const role = await this.repository.findById(id)
        if (!role) {
            throw new ResourceNotFoundException()
        }
        return role
    }
}