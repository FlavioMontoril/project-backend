
export interface TaskData {
    id?: string,
    code: string,
    summary: string,
    description: string,
    type: TaskType,
    status?: TaskStatus,
    createdAt?: Date,
    updatedAt?: Date | null,
    reporterId: string,
    assigneeId?: string,
    archived?: boolean,
}

export enum TaskType {
    TASK = "TASK",
    EPIC = "EPIC",
    BUG = "BUG",
    SUB_TASK = "SUB_TASK",
}

export enum TaskStatus {
    OPEN = "OPEN",
    DONE = "DONE",
    IN_PROGRESS = "IN_PROGRESS",
    UNDER_REVIEW = "UNDER_REVIEW",
    CANCELED = "CANCELED",
}

export type CreateTaskPayload = Pick<TaskData, "code" | "summary" | "description" | "type" | "status" | "createdAt" | "assigneeId">;
export type UpdateTaskPayload = Partial<Pick<TaskData, "summary" | "description" | "type" | "status" | "assigneeId">>;
