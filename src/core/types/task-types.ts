
export interface TaskData {
    id?: string,
    summary: string,
    description: string,
    type: TaskType,
    createdAt?: Date,
    updatedAt?: Date | null,
    userId?: string,
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
}

export type CreateTaskDto = Pick<TaskData, "summary" | "description" | "type" | "createdAt">;
export type CreateTaskPayload = CreateTaskDto & {
    userId: string,
    assigneeId?: string[],
  };

export type UpdateTaskPayload = Partial<Pick<TaskData, "summary" | "description"  | "type">>;
