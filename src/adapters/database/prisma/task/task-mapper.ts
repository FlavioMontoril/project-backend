import { Task } from "@/core/entities/task-entitie.js";
import { Task as PrismaTask } from "@/generated/prisma/index.js"
import { TaskData, TaskStatus, TaskType } from "@/core/types/task-types.js";
export class TaskMapper {
    public static toPersistence(entity: Task): PrismaTask {
        return {
            id: entity.getId(),
            summary: entity.getSummary(),
            description: entity.getDescription(),
            type: entity.getType() as TaskType,
            status: entity.getStatus() as TaskStatus,
            createdAt: entity.getCreatedAt(),
            updatedAt: entity.getUpdatedAt() ?? null,
            userId: entity.getUserId() ?? null
        }
    }
    public static toDomain(raw: PrismaTask): Task {
        return Task.build({
            id: raw.id,
            summary: raw.summary,
            description: raw.description,
            type: raw.type as TaskType,
            status: raw.status as TaskStatus,
            createdAt: raw.createdAt ?? new Date(),
            updatedAt: raw.updatedAt,
            userId: raw.userId ?? undefined,
        })
    }
}