import { randomUUID } from "crypto"
import type { TaskData, TaskStatus, TaskType } from "../types/task-types.js"
import type { UserData } from "core/types/user-type.js"

export class Task {
    private readonly id: string
    private summary: string
    private description: string
    private assignee?: string
    private reporter: string
    private type: TaskType
    private status: TaskStatus
    private readonly createdAt: Date
    private updatedAt?: Date
    private userId: string

    private constructor(data: TaskData) {
        this.summary = data.summary,
        this.description = data.description,
        this.assignee = data.assignee ?? undefined,
        this.reporter = data.reporter,
        this.type = data.type,
        this.status = data.status,
        this.createdAt = data.createdAt ?? new Date()
        this.updatedAt = data.updatedAt ?? undefined
        this.userId = data.userId

        if (!data.id) {
            this.id = randomUUID()
        } else {
            this.id = data.id
        }
    }

    public static build(data: TaskData) {
        return new Task(data)
    }

    public getId(): string { return this.id }
    public getSummary(): string { return this.summary }
    public getDescription(): string { return this.description }
    public getAssignee(): string | undefined { return this.assignee }
    public getReporter(): string { return this.reporter }
    public getType(): TaskType { return this.type }
    public getStatus(): TaskStatus { return this.status }
    public getCreatedAt(): Date { return this.createdAt }
    public getUpdatedAt(): Date | undefined { return this.updatedAt }
    public getUserId(): string {return this.userId}

    public setSummary(summary: string = this.summary) { this.summary = summary; return this }
    public setDescription(description: string = this.description) { this.description = description; return this }
    public setAssignee(assignee: string | undefined = this.assignee) { this.assignee = assignee; return this }
    public setReporter(reporter: string = this.reporter) { this.reporter = reporter; return this }
    public setType(type: TaskType = this.type) { this.type = type; return this }
    public setStatus(status: TaskStatus = this.status) { this.status = status; return this }
    public setUpdatedAt(updatedAt: Date | undefined = this.updatedAt) { this.updatedAt = updatedAt; return this }
    public setUserId(userId: string = this.userId) {this.userId = userId; return this}

    public toJSON() {
        return {
            id: this.id,
            summary: this.summary,
            description: this.description,
            assignee: this.assignee,
            reporter: this.reporter,
            type: this.type,
            status: this.status,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
            userId: this.userId
        }
    }
}