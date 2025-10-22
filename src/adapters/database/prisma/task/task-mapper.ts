import { Task } from "core/entities/task-entitie.js";
import type { Task as PrismaTask } from "../../../../generated/prisma/index.js"
import type { TaskData, TaskStatus, TaskType } from "core/types/task-types.js";
export class TaskMapper {
    public static toPersistence(entity: Task): PrismaTask {
        return {
            id: entity.getId(),
            summary: entity.getSummary(),
            description: entity.getDescription(),
            assignee: entity.getAssignee() ?? null,
            reporter: entity.getReporter(),
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
            assignee: raw.assignee ?? undefined,
            reporter: raw.reporter,
            type: raw.type as TaskType,
            status: raw.status as TaskStatus,
            createdAt: raw.createdAt ?? new Date(),
            updatedAt: raw.updatedAt,
            userId: raw.userId ?? undefined,
        })
    }
}