export interface TasksUsersData {
  id?: string;
  reporterId: string;
  assigneeId: string;
  taskId: string,
  status?: TaskStatus;
  updatedAt?: Date;
  createdAt?: Date;
}

export enum TaskStatus {
  OPEN = "OPEN",
  IN_PROGRESS = "IN_PROGRESS",
  UNDER_REVIEW = "UNDER_REVIEW",
  DONE = "DONE",
  CANCELED = "CANCELED",
  CONTINUED = "CONTINUED",
}

export type CreateTasksUsersPayload = Pick<TasksUsersData, "reporterId" | "assigneeId" | "taskId">