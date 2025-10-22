import { User } from "core/entities/user-entitie.js";
import type { User as PrismaUser } from "../../../../generated/prisma/index.js"
import type { Task as TaskPrisma } from "../../../../generated/prisma/index.js"
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
            updatedAt: raw.updatedAt ?? undefined,
            tasks: raw.tasks?.map(taskRaw => TaskMapper.toDomain(taskRaw).toJSON()) ?? []
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