import type { UserRepository } from "core/repository/contracts/user-repository.js";

export class findAllUsersWithHasTasksOpenUseCase{
    constructor(private readonly userRepository: UserRepository){}
    public async execute(){
        const rawUser = await this.userRepository.findAllUsersWithHasTasksOpen()
        return rawUser
    }
}