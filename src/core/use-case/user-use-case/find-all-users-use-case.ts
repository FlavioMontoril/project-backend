import { ResourceNotFoundException } from "@/core/exceptions/resource/ResourceNotFoundException.js";
import { UserRepository } from "@/core/repository/contracts/user-repository.js";

export class FindAllUsersUseCase {
    constructor(private readonly repository: UserRepository) { }
    public async execute() {
        const users = await this.repository.findAll()
        if (!users) {
            throw new ResourceNotFoundException()
        }
        return users
    }
}