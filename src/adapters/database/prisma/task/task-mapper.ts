import { Task } from "@/core/entities/task-entitie.js";
import { Task as PrismaTask } from "@/generated/prisma/index.js"
import { TaskStatus, TaskType } from "@/core/types/task-types.js";
export class TaskMapper {
    public static toPersistence(entity: Task): PrismaTask {
        return {
            id: entity.getId(),
            code: entity.getCode(),
            summary: entity.getSummary(),
            description: entity.getDescription(),
            type: entity.getType() as TaskType,
            status: entity.getStatus() as TaskStatus,
            createdAt: entity.getCreatedAt(),
            updatedAt: entity.getUpdatedAt() ?? null,
            reporterId: entity.getReporterId(),
            assigneeId: entity.getAssigneeId() ?? null,
            archived: entity.getArchived()
        }
    }
    public static toDomain(raw: PrismaTask): Task {
        return Task.build({
            id: raw.id,
            code: raw.code,
            summary: raw.summary,
            description: raw.description,
            type: raw.type as TaskType,
            status: raw.status as TaskStatus,
            createdAt: raw.createdAt ?? new Date(),
            updatedAt: raw.updatedAt,
            reporterId: raw.reporterId,
            assigneeId: raw.assigneeId ?? null,
            archived: raw.archived
        })
    }
}