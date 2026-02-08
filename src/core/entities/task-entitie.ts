import { randomUUID } from "crypto"
import { TaskStatus, type TaskData, type TaskType } from "@/core/types/task-types.js"

export class Task {
    private readonly id: string
    private readonly code: string
    private summary: string
    private description: string
    private type: TaskType
    private status: TaskStatus
    private readonly createdAt: Date
    private updatedAt: Date | null
    private userId: string | null
    private archived: boolean


    private constructor(data: TaskData) {
        this.id = data.id ?? randomUUID();
        this.code = data.code;
        this.summary = data.summary;
        this.description = data.description;
        this.type = data.type;
        this.status = data.status ?? TaskStatus.OPEN;
        this.createdAt = data.createdAt ?? new Date();
        this.updatedAt = data.updatedAt ?? null
        this.userId = data.userId ?? null
        this.archived = data.archived ?? null

    }

    public static build(data: TaskData) {
        return new Task(data)
    }

    public getId(): string { return this.id }
    public getCode(): string { return this.code }
    public getSummary(): string { return this.summary }
    public getDescription(): string { return this.description }
    public getType(): TaskType { return this.type }
    public getStatus(): TaskStatus { return this.status }
    public getCreatedAt(): Date { return this.createdAt }
    public getUpdatedAt(): Date | null { return this.updatedAt }
    public getUserId(): string | null { return this.userId }
    public getArchived(): boolean { return this.archived }

    public setSummary(summary: string = this.summary) { this.summary = summary; }
    public setDescription(description: string = this.description) { this.description = description; }
    public setType(type: TaskType = this.type) { this.type = type; }
    public setStatus(status: TaskStatus) { this.status = status }
    public setUserId(userId: string | null = this.userId) { this.userId = userId; }
    public setUpdatedAt() { this.updatedAt = new Date(); }
    public setArchived() { this.archived = !this.archived }

    public toJSON() {
        return {
            id: this.id,
            code: this.code,
            summary: this.summary,
            description: this.description,
            type: this.type,
            status: this.status,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt ?? null,
            userId: this.userId ?? null
        }
    }
}