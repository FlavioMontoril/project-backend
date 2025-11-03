import { Role } from "core/entities/role-entitie.js";
import { Role as PrismaRole } from "../../../../generated/prisma/index.js"
import { User as PrismaUser } from "../../../../generated/prisma/index.js"
import { RoleOptions } from "core/types/role-types.js";
import { UserMapper } from "../user/user-mapper.js";

export class RoleMapper {
    public static toDomain(raw: PrismaRole & { user?: PrismaUser[] }): Role {

        return Role.build({
            id: raw.id,
            name: raw.name as RoleOptions,
            description: raw.description,
            createdAt: raw.createdAt,
            updatedAt: raw.updatedAt ?? null,
            user: raw.user?.map((user) => UserMapper.toDomain(user)) ?? []
        });
    }
    public static toPersistence(entity: Role): PrismaRole {
        return {
            id: entity.getId(),
            name: entity.getName() as RoleOptions,
            description: entity.getDescription(),
            createdAt: entity.getCreatedAt(),
            updatedAt: entity.getUpdatedAt() ?? null
        }
    }
}