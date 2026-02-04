import { Task } from "@/core/entities/task-entitie.js";

export interface UserData {
    id?: string;
    name: string;
    email: string;
    passwordHash: string;
    department: string;
    roleId: string;
    createdAt?: Date;
    updatedAt?: Date | null;
    tasks?: Task[];
}

export type UpdateUserPayload = Partial<Pick<UserData, "name" | "email" | "department" | "roleId">>;
