import { Role } from "core/entities/role-entitie.js";
import { InvalidPropertiesException } from "core/exceptions/InvalidPropertiesException.js";
import { RoleRepository } from "core/repository/contracts/role-repository.js";
import { RoleData, RoleOptions } from "core/types/role-types.js";
import { randomUUID } from "crypto";

export class CreateRoleUseCase {
    constructor(private readonly repository: RoleRepository) { }
    public async execute(payload: RoleData) {

        if (!payload.name || !payload.description) {
            throw new InvalidPropertiesException()
        }

        const existingTole = await this.repository.findByOptions(payload.name)
        if(existingTole){
            throw new Error("Resource Already Exists Error")
        }
        const newRole = Role.build({
            id: randomUUID(),
            name: payload.name as RoleOptions,
            description: payload.description,
            createdAt: new Date(),
            updatedAt: null,
            user: [],
        });
        await this.repository.create(newRole)
    }
}