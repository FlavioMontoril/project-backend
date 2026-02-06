import { RoleRepository } from "@/core/repository/contracts/role-repository.js";
import { UserRepository } from "@/core/repository/contracts/user-repository.js";
import { RoleOptions } from "@/core/types/role-types.js";

export class NotificatioRecipientsResolverUseCase {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly roleRepository: RoleRepository,
    ) { }
    public async execute(triggeredId: string, assigneeIds?: string[]) {
        const roles = await this.roleRepository.findAll()
        const users = await this.userRepository.findAll();

        if (!roles || !users) return [];

        const roleGuestId = roles.find((role) => role.getName() === RoleOptions.GUEST).getId();

        if (assigneeIds && assigneeIds.length > 0) {
            return users
            .filter((user) =>
                    assigneeIds.includes(user.getId()) &&
                    user.getId() !== triggeredId &&
                    user.getRoleId() !== roleGuestId
            );
        };
        return users.filter((user) => user.getId() !== triggeredId && user.getRoleId() !== roleGuestId);
    }
}