import type { UserData } from "./user-type.js";

export interface TaskData{
    id?: string,
    summary: string,
    description: string,
    assignee?: string,
    reporter: string,
    type: TaskType,
    status: TaskStatus,
    createdAt?: Date,
    updatedAt?: Date | null,
    userId?: string
}

export enum TaskType{
    TASK="TASK",
    EPIC="EPIC",
    BUG="BUG",
    SUB_TASK="SUB_TASK",
}

export enum TaskStatus{
    OPEN="OPEN",
    DONE="DONE",
    IN_PROGRESS="IN_PROGRESS",
    UNDER_REVIEW="UNDER_REVIEW",
}