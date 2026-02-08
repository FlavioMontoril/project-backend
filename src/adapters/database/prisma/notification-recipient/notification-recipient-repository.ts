import { NotificationRecipient } from "@/core/entities/notification-recipient-entity.js";
import { NotificationRecipientRepository } from "@/core/repository/contracts/notification-recipient-repository.js";
import { prisma } from "@/infra/database/client.js";
import { NotificationRecipientMapper } from "./notification-recipient-mapper.js";

export class NotificationRecipientPrismaRepository
    implements NotificationRecipientRepository {
    public async create(recipient: NotificationRecipient): Promise<void> {
        const rawRecipient =
            NotificationRecipientMapper.toPersistence(recipient);

        await prisma.notificationRecipient.create({
            data: rawRecipient,
        });
    }

    public async save(recipient: NotificationRecipient): Promise<void> {
        const data = NotificationRecipientMapper.toPersistence(recipient);
        await prisma.notificationRecipient.upsert({
            where: { id: data.id },
            update: { readAt: data.readAt },
            create: data,
        });
    }

    public async markAllAsRead(userId: string): Promise<void> {
        await prisma.notificationRecipient.updateMany({
            where: {
                userId,
                readAt: null,
            },
            data: { readAt: new Date() }
        });
    }

    public async findById(
        id: string
    ): Promise<NotificationRecipient | null> {
        const rawRecipient = await prisma.notificationRecipient.findUnique({
            where: { id },
        });

        return NotificationRecipientMapper.toDomain(rawRecipient);
    }

    public async findByUserId(
        userId: string
    ): Promise<NotificationRecipient[]> {
        const rawRecipients =
            await prisma.notificationRecipient.findMany({
                where: { userId },
                orderBy: { createdAt: "desc" },
            });

        return rawRecipients
            .map(NotificationRecipientMapper.toDomain)
            .filter(Boolean) as NotificationRecipient[];
    }
}
