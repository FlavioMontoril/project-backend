import { ResourceNotFoundError } from "core/errors/resource-not-found.js";
import { UserRepository } from "core/repository/contracts/user-repository.js";
import { hash, compare } from "bcryptjs";
import { InvalidArgumentsError } from "core/errors/invalid-arguments.js";
import { InvalidOperationException } from "core/exceptions/InvalidOperationException.js";
import { InvalidPropertiesException } from "core/exceptions/InvalidPropertiesException.js";

interface UserPasswordUpdateProps {
    currentPassword: string,
    newPassword: string,
}

export class UpdatePasswordUserUseCase {
    constructor(private readonly repository: UserRepository) { }
    public async execute(id: string, payload: UserPasswordUpdateProps) {

        if (!payload.newPassword || !payload.currentPassword) throw new InvalidPropertiesException()

        const user = await this.repository.findById(id)
        if (!user) throw new ResourceNotFoundError()


        const matchPassword = await compare(payload.currentPassword, user.getPasswordHash())
        if (!matchPassword) throw new InvalidArgumentsError()

        const matchNewCurrentPassword = await compare(payload.newPassword, user.getPasswordHash())
        if (matchNewCurrentPassword) throw new InvalidOperationException()

        const hashedPassword = await hash(payload.newPassword, 8)

        user.setPasswordHash(hashedPassword)

        const newPassword = await this.repository.update(user)
        return newPassword
    }
}