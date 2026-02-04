import { ResourceNotFoundException } from "@/core/exceptions/resource/ResourceNotFoundException.js";
import { UserRepository } from "@/core/repository/contracts/user-repository.js";
import { UpdateUserPayload } from "@/core/types/user-type.js";

export class UpdateUserUseCase {
    constructor(
        private readonly userRepository: UserRepository) { }
    public async execute(id: string, payload: UpdateUserPayload) {
        const user = await this.userRepository.findById(id)
        if (!user) {
            throw new ResourceNotFoundException()
        }

        user.setName(payload.name)
        user.setEmail(payload.email)
        user.setDepartment(payload.department)
        user.setRoleId(payload.roleId)
        user.setUpdatedAt()

        const updatedUser = await this.userRepository.update(user)
        return updatedUser
    }
}