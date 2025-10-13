export interface RoleData {
  id?: string;
  name: RoleOptions;
  description: string;
  createdAt: Date;
  updatedAt?: Date;
}
export enum RoleOptions {
    MASTER = 'MASTER',
    ADMIN = 'ADMIN',
    COMMON = 'COMMON',
    GUEST = 'GUEST',
}