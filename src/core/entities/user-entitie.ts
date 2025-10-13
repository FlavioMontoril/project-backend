import type { TaskData } from "core/types/task-types.js";
import type { UserData } from "core/types/user-type.js";
import { randomUUID } from "crypto";

export class User {
    private readonly id: string;
    private name: string;
    private email: string;
    private passwordHash: string;
    private department: string;
    private roleId: string;
    private readonly createdAt: Date;
    private updatedAt?: Date;
    private tasks?: TaskData[]

    private constructor(data: UserData) {
        this.name = data.name,
            this.email = data.email,
            this.passwordHash = data.passwordHash,
            this.department = data.department,
            this.roleId = data.roleId,
            this.createdAt = new Date(),
            this.updatedAt = this.updatedAt ?? undefined
        this.tasks = data.tasks ?? undefined

        if (!data.id) {
            this.id = randomUUID()
        } else {
            this.id = data.id
        }
    }

    public static build(data: UserData) {
        return new User(data)
    }

    public getId(): string { return this.id }
    public getName(): string { return this.name }
    public getEmail(): string { return this.email }
    public getPasswordHash(): string { return this.passwordHash }
    public getDepartment(): string { return this.department }
    public getRoleId(): string { return this.roleId }
    public getCreatedAt(): Date { return this.createdAt }
    public getUpdatedAt(): Date | undefined { return this.updatedAt }
    public getTasks(): TaskData[] | undefined {return this.tasks}

    public setName(name: string) { this.name = name; return this }
    public setEmail(email: string) { this.email = email; return this }
    public setPasswordHash(passwordHash: string) { this.passwordHash = passwordHash; return this }
    public setDepartment(department: string) { this.department = department; return this }
    public setRoleId(roleId: string) { this.roleId = roleId; return this }
    public setUpdatedAt(updatedAt: Date | undefined = this.updatedAt) { this.updatedAt = updatedAt; return this }
    public setTasks(tasks: TaskData[] | undefined) {this.tasks = tasks; return this}

    public toJSON() {
        return {
            id: this.id,
            name: this.name,
            email: this.email,
            passwordHash: this.passwordHash,
            department: this.department,
            roleId: this.roleId,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
            tasks: this.tasks,
        }
    }
}