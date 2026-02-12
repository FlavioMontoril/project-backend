import { RoleRepository } from "@/core/repository/contracts/role-repository.js";
import { UserRepository } from "@/core/repository/contracts/user-repository.js";
import { RoleOptions } from "@/core/types/role-types.js";

export class NotificatioRecipientsResolverUseCase {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly roleRepository: RoleRepository,
    ) { }
    public async execute(triggeredId: string, assigneeId?: string) {
        const roles = await this.roleRepository.findAll()
        const users = await this.userRepository.findAll();

        if (!roles || !users) return [];

        const roleGuestId = roles.find((role) => role.getName() === RoleOptions.GUEST).getId();

        if (assigneeId) {
            const assignee = users
            .find((user) => user.getId() === assigneeId);
            return assignee ? [assignee] : []
        };
        return users.filter((user) => user.getId() !== triggeredId && user.getRoleId() !== roleGuestId);
    }
}