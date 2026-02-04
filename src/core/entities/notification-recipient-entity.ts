import { randomUUID } from "crypto";

export interface NotificationRecipientProps {
    id?: string;
    notificationId: string;
    userId: string;
    readAt?: Date | null;
    createdAt?: Date;
}

export class NotificationRecipient {
    private readonly id: string;
    private readonly notificationId: string;
    private readonly userId: string;
    private readAt: Date | null;
    private readonly createdAt: Date;

    private constructor(data: NotificationRecipientProps) {
        this.id = data.id ?? randomUUID();
        this.notificationId = data.notificationId;
        this.userId = data.userId;
        this.readAt = data.readAt ?? null;
        this.createdAt = data.createdAt ?? new Date();
    }

    public static build(data: NotificationRecipientProps) {
        return new NotificationRecipient(data);
    }

    public getId(): string {
        return this.id;
    }

    public getNotificationId(): string {
        return this.notificationId;
    }

    public getUserId(): string {
        return this.userId;
    }

    public getReadAt(): Date | null {
        return this.readAt;
    }

    public getCreatedAt(): Date {
        return this.createdAt;
    }

    public markAsRead(date: Date = new Date()) {
        this.readAt = date;
    }

    public isRead(): boolean {
        return this.readAt !== null;
    }

    public toJSON() {
        return {
            id: this.id,
            notificationId: this.notificationId,
            userId: this.userId,
            readAt: this.readAt,
            createdAt: this.createdAt,
        };
    }
}
