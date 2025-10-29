import { User } from "core/entities/user-entitie.js";
import { InvalidPropertiesException } from "core/exceptions/InvalidPropertiesException.js";
import type { UserRepository } from "core/repository/contracts/user-repository.js";
import { hash } from "bcryptjs"
import { ResourceAlreadyExistsError } from "core/errors/resource-already-exists.js";
import type { RoleRepository } from "core/repository/contracts/role-repository.js";
import { ResourceNotFoundException } from "core/exceptions/ResourceNotFoundException.js";
import type { UserData } from "core/types/user-type.js";

export class CreateUserUseCase {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly roleRepository: RoleRepository
    ) { }
    public async execute(payload: UserData) {
        if (!payload.email || !payload.department || !payload.name || !payload.passwordHash || !payload.roleId) {
            throw new InvalidPropertiesException()
        }
        const matchRole = await this.roleRepository.findById(payload.roleId)
        if (!matchRole) {
            throw new ResourceNotFoundException();
        }

        const user = await this.userRepository.findByEmail(payload.email)
        if (user) {
            throw new ResourceAlreadyExistsError()
        }
        const hashedPassword = await hash(payload.passwordHash, 8)

        const newTask = User.build({
            name: payload.name,
            email: payload.email,
            passwordHash: hashedPassword,
            department: payload.department,
            roleId: payload.roleId,
        });
        await this.userRepository.create(newTask)
    }
}