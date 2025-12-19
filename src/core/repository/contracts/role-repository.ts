import { Role } from "@/core/entities/role-entitie.js";
import { RoleOptions } from "@/core/types/role-types.js";

export interface RoleRepository{
    create:(role: Role)=>Promise<void>
    update:(role: Role)=>Promise<Role>
    delete:(id: string)=>Promise<void>
    findAll:()=>Promise<Role[]>
    findById:(id:string)=>Promise<Role | null>
    findByOptions:(roleOptions: RoleOptions)=>Promise<Role | null>
    findAllRoleById:(id: string)=>Promise<Role | null>
}