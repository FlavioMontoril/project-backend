import { ResourceNotFoundException } from "@/core/exceptions/ResourceNotFoundException.js";
import { UserRepository } from "@/core/repository/contracts/user-repository.js";

interface UserDataProps{
    name: string;
    email: string;
    department: string;
    roleId: string;
}

export class UpdateUserUseCase {
    constructor(
        private readonly userRepository: UserRepository) { }
    public async execute(id: string, payload: UserDataProps) {
        const user = await this.userRepository.findById(id)
        if (!user) {
            throw new ResourceNotFoundException()
        }

        user
            .setName(payload.name)
            .setEmail(payload.email)
            .setDepartment(payload.department)
            .setRoleId(payload.roleId)

        const updatedUser = await this.userRepository.update(user)
        return updatedUser
    }
}