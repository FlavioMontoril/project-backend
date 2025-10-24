import type { User } from "core/entities/user-entitie.js";

export interface RoleData {
  id?: string;
  name: RoleOptions;
  description: string;
  createdAt: Date;
  updatedAt?: Date;
  user: User[];
}
export enum RoleOptions {
    MASTER = 'MASTER',
    ADMIN = 'ADMIN',
    COMMON = 'COMMON',
    GUEST = 'GUEST',
}