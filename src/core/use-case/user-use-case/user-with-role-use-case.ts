import { RoleRepository } from "core/repository/contracts/role-repository.js";
import { UserRepository } from "core/repository/contracts/user-repository.js";
import { RoleData } from "core/types/role-types.js";

export interface UserWithRoleDTO {
    id: string;
    name: string;
    email: string;
    department: string;
    passwordHash: string;
    role: RoleData
} 

export class UserWithRoleUseCase {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly roleRepository: RoleRepository
    ) {}

    public async execute(email: string){
        const user = await this.userRepository.findByEmail(email)
        if(!user) return null

        if(user.getRoleId()){
            const role = await this.roleRepository.findById(user.getRoleId())
            if(!role) return

            return{
                id: user.getId(),
                name: user.getName(),
                email: user.getEmail(),
                department: user.getDepartment(),
                passwordHash: user.getPasswordHash(),
                role,
            }
        }
    }
}