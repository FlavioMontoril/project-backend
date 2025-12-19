import { Notification } from "@/core/entities/notification-entity.js"
import { NotificationRepository } from "@/core/repository/contracts/notification-repository.js"
import {  Notification as PrismaNotification } from "@/generated/prisma/index.js";
import { NotificationMapper } from "@/adapters/database/prisma/notification/notification-mapper.js";
import { prisma } from "@/infra/database/client.js";



export class PrismaNotificationRepository implements NotificationRepository {

    public async create(notification: Notification): Promise<Notification> {
        const rawRole: PrismaNotification = NotificationMapper.toPersistence(notification)
         await prisma.notification.create({
            data: rawRole
        });
        return NotificationMapper.toDomain(rawRole)
    }

  async findByUserId(userId: string): Promise<Notification[]> {
    const raw = await prisma.notification.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    })

    return raw.map(NotificationMapper.toDomain)
  }

    async markAsRead(notificationId: string):Promise<void> {
        await prisma.notification.update({
            where: { id: notificationId },
            data: { read: true },
        })
    }

    async markAllAsRead(userId: string): Promise<void> {
        await prisma.notification.updateMany({
            where: { userId, read: false },
            data: { read: true },
        })
    }
}
