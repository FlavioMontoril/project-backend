import { randomUUID } from "crypto"
import { TaskStatus, type TaskData, type TaskType } from "../types/task-types.js"

export class Task {
    private readonly id: string
    private summary: string
    private description: string
    private assignee: string | null
    private reporter: string
    private type: TaskType
    private status: TaskStatus
    private readonly createdAt: Date
    private updatedAt: Date | null
    private userId: string | null

    private constructor(data: TaskData) {
        this.id = data.id ?? randomUUID()
        this.summary = data.summary;
        this.description = data.description;
        this.assignee = data.assignee ?? null;
        this.reporter = data.reporter;
        this.type = data.type;
        this.status = data.status ?? TaskStatus.OPEN;
        this.createdAt = data.createdAt ?? new Date();
        this.updatedAt = data.updatedAt ?? null
        this.userId = data.userId ?? null
    }

    public static build(data: TaskData) {
        return new Task(data)
    }

    private touch() { this.updatedAt = new Date(); return this }

    public getId(): string { return this.id }
    public getSummary(): string { return this.summary }
    public getDescription(): string { return this.description }
    public getAssignee(): string | null { return this.assignee }
    public getReporter(): string { return this.reporter }
    public getType(): TaskType { return this.type }
    public getStatus(): TaskStatus { return this.status }
    public getCreatedAt(): Date { return this.createdAt }
    public getUpdatedAt(): Date | null { return this.updatedAt }
    public getUserId(): string | null { return this.userId }

    public setSummary(summary: string = this.summary) { this.summary = summary; return this.touch() }
    public setDescription(description: string = this.description) { this.description = description; return this.touch() }
    public setAssignee(assignee: string | null = this.assignee) { this.assignee = assignee; return this.touch() }
    public setReporter(reporter: string = this.reporter) { this.reporter = reporter; return this.touch() }
    public setType(type: TaskType = this.type) { this.type = type; return this.touch() }
    public setStatus(status: TaskStatus = this.status) { this.status = status; return this.touch() }
    public setUserId(userId: string | null = this.userId) { this.userId = userId; return this.touch() }

    public toJSON() {
        return {
            id: this.id,
            summary: this.summary,
            description: this.description,
            assignee: this.assignee ?? null,
            reporter: this.reporter,
            type: this.type,
            status: this.status,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt ?? null,
            userId: this.userId ?? null
        }
    }
}