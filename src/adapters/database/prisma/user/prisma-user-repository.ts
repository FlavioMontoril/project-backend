import type { User } from "core/entities/user-entitie.js";
import type { UserRepository } from "core/repository/contracts/user-repository.js";
import type { User as PrismaUser } from "../../../../generated/prisma/index.js"
import { UserMapper } from "./user-mapper.js";
import { PrismaClient } from "../../../../generated/prisma/index.js"
const prisma = new PrismaClient()

export class PrismaUserRepository implements UserRepository {
    public async create(user: User): Promise<void> {
        const rawUser: PrismaUser = UserMapper.toPersistence(user)
        await prisma.user.create({
            data: rawUser
        })
    }
    public async findAll(): Promise<User[]> {
        const rawUsers: PrismaUser[] = await prisma.user.findMany()
        return rawUsers.map(UserMapper.toDomain)
    }
    public async findByEmail(email: string): Promise<User | null> {
        const rawUser: PrismaUser | null = await prisma.user.findUnique({
            where: { email }
        });
        if (!rawUser) return null
        return UserMapper.toDomain(rawUser)
    }
    public async findById(id: string): Promise<User | null> {
        const rawUser = await prisma.user.findUnique({
            where: { id },
            include: { tasks: true }
        });
        if (!rawUser) return null
        return UserMapper.toDomain(rawUser)
    }
    public async delete(id: string):Promise<void>{
        await prisma.user.delete({
            where: {id}
        })
    }

    public async update(user: User):Promise<User>{
        const rawUser:PrismaUser = UserMapper.toPersistence(user)

        const updateUser = await prisma.user.update({
            where: {id: user?.getId().toString()},
            data: rawUser,
        })

        return UserMapper.toDomain(updateUser)
    }
}