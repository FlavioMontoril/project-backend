    import { RoleRepository } from "@/core/repository/contracts/role-repository.js";
    import { UserRepository } from "@/core/repository/contracts/user-repository.js";
    import { InvalidPropertiesException } from "@/core/exceptions/validation/InvalidPropertiesException.js";
    import { InvalidArgumentsException } from "@/core/exceptions/validation/InvalidArgumentsException.js";
    import { InvalidOperationException } from "@/core/exceptions/domain/InvalidOperationException.js";
    import { compare } from "bcryptjs";
    import jwt from "jsonwebtoken";
    import dotenv from "dotenv"

    dotenv.config()

    const JWT_SECRET = process.env.JWT_SECRET as string;

    interface AuthDto {
        email: string,
        password: string,
    }

    export class AuthenticateUseCase {
        constructor(
            private readonly userRepository: UserRepository,
            private readonly roleRepository: RoleRepository
        ) { }

        public async execute(data: AuthDto) {

            if (!data.email || !data.password) throw new InvalidPropertiesException()

            const user = await this.userRepository.findByEmail(data.email)
            if (!user) throw new InvalidArgumentsException()

            const role = await this.roleRepository.findById(user.getRoleId())
            if (!role) throw new InvalidArgumentsException()

            const matchPassword = await compare(data.password, user.getPasswordHash())
            if (!matchPassword) throw new InvalidOperationException()

            const tokenPayload = {
                id: user.getId(),
                name: user.getName(),
                email: user.getEmail(),
                department: user.getDepartment(),
                role: {
                    id: role.getId(),
                    name: role.getName(),
                }
            }

            const token = jwt.sign(
                tokenPayload,
                JWT_SECRET,
                { subject: user.getId().toString(), expiresIn: "1d" });

            return { token }
        }
    }