import { Role } from "core/entities/role-entitie.js";
import { InvalidPropertiesException } from "core/exceptions/InvalidPropertiesException.js";
import type { RoleRepository } from "core/repository/contracts/role-repository.js";
import type { RoleData, RoleOptions } from "core/types/role-types.js";

interface RoleRequestDTO {
    name: RoleOptions;
    description: string;
}

export class CreateRoleUseCase {
    constructor(private readonly repository: RoleRepository) {}
    public async execute(payload: RoleRequestDTO) {
        if (!payload.name || !payload.description) {
            throw new InvalidPropertiesException()
        }

        const existingTole = await this.repository.findByOptions(payload.name)
        if(existingTole){
            throw new Error("Resource Already Exists Error")
        }   
        const newRole = Role.build({
            name: payload.name,
            description: payload.description,
            createdAt: new Date(),
            updatedAt: undefined,
        });
        await this.repository.create(newRole)
    }
}