import { Notification } from "@/core/entities/notification-entitie.js";
import { NotificationRepository } from "@/core/repository/contracts/notification-repository.js";
import { Notification as NotificationPrisma } from "@/generated/prisma/index.js";
import { prisma } from "@/infra/database/client.js"
import { NotificationMapper } from "./notification-mapper.js";

export class NotificationPrismaRepository implements NotificationRepository {
    public async create(notification: Notification): Promise<void> {
        const rawNotification: NotificationPrisma = NotificationMapper.toPersistence(notification);

        await prisma.notification.create({
            data: rawNotification
        });
    }
    public async findAll(): Promise<Notification[]> {
        const rawNotification = await prisma.notification.findMany()
        return rawNotification.map(NotificationMapper.toDomain)
    }
    public async findById(id: string): Promise<Notification | null> {
        const rawNotification = await prisma.notification.findUnique({
            where: { id }
        });

        return NotificationMapper.toDomain(rawNotification);

    }
}