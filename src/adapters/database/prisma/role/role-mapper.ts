import { Role } from "core/entities/role-entitie.js";
import type { Role as PrismaRole } from "../../../../generated/prisma/index.js"
import type { RoleOptions } from "core/types/role-types.js";

export class RoleMapper {
    public static toDomain(raw: PrismaRole): Role {
        return Role.build({
            id: raw.id,
            name: raw.name as RoleOptions,
            description: raw.description,
            createdAt: raw.createdAt,
            updatedAt: raw.updatedAt ?? undefined
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