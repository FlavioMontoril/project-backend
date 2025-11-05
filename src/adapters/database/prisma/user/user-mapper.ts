import { User } from "core/entities/user-entitie.js";
import { User as PrismaUser } from "@prisma/client"
import { Task as TaskPrisma } from "@prisma/client"
import { TaskMapper } from "../task/task-mapper.js";


export class UserMapper {
    public static toDomain(raw: PrismaUser & {tasks?: TaskPrisma[]}): User {
        return User.build ({
            id: raw.id,
            name: raw.name,
            email: raw.email,
            passwordHash: raw.passwordHash,
            department: raw.department,
            roleId: raw.roleId,
            createdAt: raw.createdAt,
            updatedAt: raw.updatedAt ?? null,
            tasks: raw.tasks?.map(taskRaw => TaskMapper.toDomain(taskRaw)) ?? []
        })
    }

    public static toPersistence(entity: User): PrismaUser {
        return {
            id: entity.getId(),
            name: entity.getName(),
            email: entity.getEmail(),
            passwordHash: entity.getPasswordHash(),
            department: entity.getDepartment(),
            roleId: entity.getRoleId(),
            createdAt: entity.getCreatedAt(),
            updatedAt: entity.getUpdatedAt() ?? null,
        }
    }
}