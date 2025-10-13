import type { User } from "core/entities/user-entitie.js";

export interface UserRepository{
    create:(user: User)=>Promise<void>
    delete:(id: string)=>Promise<void>
    update:(user: User)=>Promise<User>
    findAll:()=>Promise<User[]>
    findById:(id: string)=>Promise<User>
    findByEmail:(email: string)=>Promise<User | null>
}