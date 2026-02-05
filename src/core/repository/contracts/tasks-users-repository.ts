import { TasksUsers } from "@/core/entities/tasks-users-entity.js";

export interface TasksUsersRepository {
  save(data: TasksUsers): Promise<void>;
  findAll(): Promise<TasksUsers[]>;
  findById(id: string): Promise<TasksUsers | null>;
  findByTaskAndAssignee(taskId: string, assigneeId: string): Promise<TasksUsers | null>;
}
