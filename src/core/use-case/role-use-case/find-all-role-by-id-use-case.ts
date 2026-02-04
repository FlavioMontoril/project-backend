import { Role } from "@/core/entities/role-entitie.js";
import { ResourceNotFoundException } from "@/core/exceptions/resource/ResourceNotFoundException.js";
import { InvalidPropertiesException } from "@/core/exceptions/validation/InvalidPropertiesException.js";
import { RoleRepository } from "@/core/repository/contracts/role-repository.js";

export class findAllRoleByIdUseCase{
    constructor(private readonly roleRepository: RoleRepository){}
    public async execute(id: string):Promise<Role | null>{
        if(!id){
            throw new InvalidPropertiesException()
        }
        const allRole = await this.roleRepository.findAllRoleById(id)
        if(!allRole){
            throw new ResourceNotFoundException()
        }
        return allRole
    }
}