import { InvalidOperationException } from "@/core/exceptions/domain/InvalidOperationException.js";
import { ResourceNotFoundException } from "@/core/exceptions/resource/ResourceNotFoundException.js";
import { InvalidArgumentsException } from "@/core/exceptions/validation/InvalidArgumentsException.js";
import { InvalidPropertiesException } from "@/core/exceptions/validation/InvalidPropertiesException.js";
import { UserRepository } from "@/core/repository/contracts/user-repository.js";
import { hash, compare } from "bcryptjs";

interface UserPasswordUpdateProps {
    currentPassword: string,
    newPassword: string,
}

export class UpdatePasswordUserUseCase {
    constructor(private readonly repository: UserRepository) { }
    public async execute(id: string, payload: UserPasswordUpdateProps) {

        if (!payload.newPassword || !payload.currentPassword) throw new InvalidPropertiesException()

        const user = await this.repository.findById(id)
        if (!user) throw new ResourceNotFoundException()


        const matchPassword = await compare(payload.currentPassword, user.getPasswordHash())
        if (!matchPassword) throw new InvalidArgumentsException()

        const matchNewCurrentPassword = await compare(payload.newPassword, user.getPasswordHash())
        if (matchNewCurrentPassword) throw new InvalidOperationException()

        const hashedPassword = await hash(payload.newPassword, 8)

        user.setPasswordHash(hashedPassword)

        const newPassword = await this.repository.update(user)
        return newPassword
    }
}