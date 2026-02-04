import { User } from "@/core/entities/user-entitie.js";

export interface RoleData {
  id?: string;
  name: RoleOptions;
  description: string;
  createdAt?: Date;
  updatedAt?: Date | null;
  user?: User[];
}
export enum RoleOptions {
  MASTER = 'MASTER',
  ADMIN = 'ADMIN',
  COMMON = 'COMMON',
  GUEST = 'GUEST',
}

export type UpdateRolePayload = Partial<Pick<RoleData, "name" | "description">>
export type CreateRolePayload = Pick<RoleData, "name" | "description">

