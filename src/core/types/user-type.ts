import type { TaskData } from "./task-types.js";

export interface UserData {
    id?: string;
    name: string;
    email: string;
    passwordHash: string;
    department: string;
    roleId: string;
    createdAt?: Date;
    updatedAt?: Date;
    tasks: TaskData[];
}