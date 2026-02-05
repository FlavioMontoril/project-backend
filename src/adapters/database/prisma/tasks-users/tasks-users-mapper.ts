import { TasksUsers } from "@/core/entities/tasks-users-entity.js";
import { TaskStatus } from "@/core/types/task-types.js";
import { TasksUser as PrismaTasksUser } from "@/generated/prisma/index.js";

export class TasksUsersMapper {
    public static toPersistence(entity: TasksUsers): PrismaTasksUser {
        return {
            id: entity.getId(),
            reporterId: entity.getReporterId(),
            assigneeId: entity.getAssigneeId(),
            taskId: entity.getTaskId(),
            status: entity.getStatus() as TaskStatus,
            createdAt: entity.getCreatedAt(),
            updatedAt: entity.getUpdatedAt(),
        };
    }

    public static toDomain(raw: PrismaTasksUser): TasksUsers {
        return TasksUsers.build({
            id: raw.id,
            reporterId: raw.reporterId,
            assigneeId: raw.assigneeId,
            taskId: raw.taskId,
            status: raw.status as TaskStatus,
            createdAt: raw.createdAt,
            updatedAt: raw.updatedAt,
        });
    }
}
