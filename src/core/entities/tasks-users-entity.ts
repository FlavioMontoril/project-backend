import { randomUUID } from "crypto";
import { TaskStatus, TasksUsersData } from "../types/tasks-users.js";

export class TasksUsers {
  private readonly id: string;
  private readonly reporterId;
  private assigneeId: string[];
  private taskId: string;
  private status: TaskStatus;
  private updatedAt: Date | null;
  private readonly createdAt: Date;

  constructor(data: TasksUsersData) {
    this.id = data.id ?? randomUUID();
    this.reporterId = data.reporterId;
    this.assigneeId = Array.isArray(data.assigneeId) ? data.assigneeId : [data.assigneeId];
    this.taskId = data.taskId;
    this.status = data.status ?? TaskStatus.OPEN;
    this.updatedAt = data.updatedAt ?? null;
    this.createdAt = data.createdAt;
  }

  public static build(data: TasksUsersData) {
    return new TasksUsers(data);
  }

  private touch() {
   this.updatedAt = new Date();
  }

  public getId(): string { return this.id }
  public getReporterId(): string { return this.reporterId }
  public getAssigneeId(): string[] { return this.assigneeId }
  public getTaskId(): string { return this.taskId }
  public getStatus(): TaskStatus { return this.status }
  public getUpdatedAt(): Date | null { return this.updatedAt }
  public getCreatedAt(): Date { return this.createdAt }

  public setAssigneeId(assigneeId: string[]) { this.assigneeId = assigneeId; this.touch() }
  public setStatus(status: TaskStatus) { this.status = status; this.touch() }

  public toJson(){
    return{
        id: this.getId(),
        reporterId: this.getReporterId(),
        assigneeId: this.getAssigneeId(),
        taskId: this.getTaskId(),
        status: this.getStatus(),
        updatedAt: this.getUpdatedAt(),
        createdAt: this.getCreatedAt(),
    }
  }
}
