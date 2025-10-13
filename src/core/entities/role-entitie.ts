import type { RoleData, RoleOptions } from "core/types/role-types.js"
import { randomUUID } from "crypto"

export class Role{
    private readonly id: string
    private name: RoleOptions
    private description: string
    private readonly createdAt: Date
    private updatedAt?:  Date

    private constructor(data: RoleData){
        this.name = data.name,
        this.description = data.description,
        this.createdAt = new Date(),
        this.updatedAt = data.updatedAt ?? undefined
        if(!data.id){
            this.id  = randomUUID()
        }else{
            this.id = data.id
        }
    }

    public static build(data: RoleData){
        return new Role(data)
    }

    public getId(): string{return this.id}
    public getName(): RoleOptions{return this.name}
    public getDescription(): string{return this.description}
    public getCreatedAt(): Date{return this.createdAt}
    public getUpdatedAt(): Date | undefined {return this.updatedAt}

    public setName(name: RoleOptions = this.name){ this.name = name; return this}
    public setDescription(description: string = this.description){ this.description = description; return this}
    public setUpdatedAt(updatedAt: Date | undefined) { this.updatedAt = updatedAt; return this}

    public toJSON(){
        return{
            id: this.id,
            name: this.name,
            description: this.description,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
        }
    }
}