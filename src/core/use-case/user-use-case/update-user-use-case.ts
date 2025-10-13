import { ResourceNotFoundException } from "core/exceptions/ResourceNotFoundException.js";
import type { RoleRepository } from "core/repository/contracts/role-repository.js";
import type { UserRepository } from "core/repository/contracts/user-repository.js";
import type { UserData } from "core/types/user-type.js";

export class UpdateUserUseCase{
constructor(
    private readonly userRepository: UserRepository,
){}
    public async execute(id: string, payload: UserData){
        const user = await this.userRepository.findById(id)
        if(!user){
            throw new ResourceNotFoundException()
        }

        user
        .setName(payload.name)
        .setEmail(payload.email)
        .setDepartment(payload.department)
        .setRoleId(payload.roleId)
        .setUpdatedAt(new Date())

        const updatedUser = await this.userRepository.update(user)
        return updatedUser
    }
}