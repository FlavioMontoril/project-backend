import { ResourceNotFoundException } from "@/core/exceptions/resource/ResourceNotFoundException.js";
import { RoleRepository } from "@/core/repository/contracts/role-repository.js";
import { UpdateRolePayload } from "@/core/types/role-types.js";

export class UpdateRoleUseCase {

    constructor(private readonly repository: RoleRepository) { }
    public async execute(id: string, payload: UpdateRolePayload) {
        const role = await this.repository.findById(id)
        if (!role) {
            throw new ResourceNotFoundException()
        }
        role.setName(payload.name)
        role.setDescription(payload.description)
        role.setUpdatedAt()

        const updatedRole = await this.repository.update(role)
        return updatedRole
    }
}