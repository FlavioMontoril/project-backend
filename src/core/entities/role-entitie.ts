import { RoleData, RoleOptions } from "@/core/types/role-types.js"
import { randomUUID } from "crypto"
import { User } from "./user-entitie.js"

export class Role {
    private readonly id: string
    private name: RoleOptions
    private description: string
    private readonly createdAt: Date
    private updatedAt: Date | null
    private user: User[]

    private constructor(data: RoleData) {
        this.id = data.id ?? randomUUID()
        this.name = data.name;
        this.description = data.description;
        this.createdAt = data.createdAt ?? new Date();
        this.updatedAt = data.updatedAt ?? null;
        this.user = data.user ?? [];
    }

    public static build(data: RoleData) {
        return new Role(data)
    }

    public getId(): string { return this.id }
    public getName(): RoleOptions { return this.name }
    public getDescription(): string { return this.description }
    public getCreatedAt(): Date { return this.createdAt }
    public getUpdatedAt(): Date | null { return this.updatedAt }
    public getUser(): User[] { return this.user }

    public setName(name: RoleOptions = this.name) { this.name = name; }
    public setDescription(description: string = this.description) { this.description = description; }
    public setUpdatedAt() { this.updatedAt = new Date() }

    public toJSON() {
        return {
            id: this.id,
            name: this.name,
            description: this.description,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
            user: this.user.map(user => user.toJSON())

        }
    }
}