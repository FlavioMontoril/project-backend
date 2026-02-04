import { ResourceNotFoundException } from "@/core/exceptions/resource/ResourceNotFoundException.js";
import { UserRepository } from "@/core/repository/contracts/user-repository.js";

export class FindUserByEmailUseCase {
    constructor(private readonly repository: UserRepository) { }
    public async execute(email: string) {

        const user = await this.repository.findByEmail(email)
        if (!user) throw new ResourceNotFoundException()

        return user
    }
}