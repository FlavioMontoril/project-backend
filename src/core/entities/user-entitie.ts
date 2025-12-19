import { UserData } from "@/core/types/user-type.js";
import { randomUUID } from "crypto";
import { Task } from "./task-entitie.js";

export class User {
    private readonly id: string;
    private name: string;
    private email: string;
    private passwordHash: string;
    private department: string;
    private roleId: string;
    private readonly createdAt: Date;
    private updatedAt: Date | null;
    private tasks: Task[]

    private constructor(data: UserData) {
        this.id = data.id ?? randomUUID();
        this.name = data.name;
        this.email = data.email;
        this.passwordHash = data.passwordHash;
        this.department = data.department;
        this.roleId = data.roleId;
        this.createdAt = new Date();
        this.updatedAt = data.updatedAt ?? null;
        this.tasks = data.tasks ?? []
    }

    public static build(data: UserData) {
        return new User(data)
    }

    private touch(){this.updatedAt = new Date(); return this}

    public getId(): string { return this.id }
    public getName(): string { return this.name }
    public getEmail(): string { return this.email }
    public getPasswordHash(): string { return this.passwordHash }
    public getDepartment(): string { return this.department }
    public getRoleId(): string { return this.roleId }
    public getCreatedAt(): Date { return this.createdAt }
    public getUpdatedAt(): Date | null { return this.updatedAt }
    public getTasks(): Task[] | undefined { return this.tasks }

    public setName(name: string) { this.name = name; return this.touch() }
    public setEmail(email: string) { this.email = email; return this.touch() }
    public setPasswordHash(passwordHash: string) { this.passwordHash = passwordHash; return this.touch() }
    public setDepartment(department: string) { this.department = department; return this.touch() }
    public setRoleId(roleId: string) { this.roleId = roleId; return this.touch() }

    public toJSON() {
        return {
            id: this.id,
            name: this.name,
            email: this.email,
            passwordHash: this.passwordHash,
            department: this.department,
            roleId: this.roleId,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt ?? null,
            tasks: this.tasks.map(use=> use.toJSON())
        }
    }
}