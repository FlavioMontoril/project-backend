import { Role } from "@/core/entities/role-entitie.js";
import { ResourceNotFoundError } from "@/core/errors/resource-not-found.js";
import { InvalidPropertiesException } from "@/core/exceptions/InvalidPropertiesException.js";
import { RoleRepository } from "@/core/repository/contracts/role-repository.js";

export class findAllRoleByIdUseCase{
    constructor(private readonly roleRepository: RoleRepository){}
    public async execute(id: string):Promise<Role | null>{
        if(!id){
            throw new InvalidPropertiesException()
        }
        const allRole = await this.roleRepository.findAllRoleById(id)
        if(!allRole){
            throw new ResourceNotFoundError()
        }
        return allRole
    }
}