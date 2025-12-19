import { NotificationProps, NotificationType } from "@/core/types/notification-types.js"
import { randomUUID } from "crypto"


export class Notification {
  private readonly id: string
  private readonly userId: string
  private readonly title: string
  private readonly message: string
  private readonly type: NotificationType
  private readonly entityId?: string
  private readonly createdAt: Date
  private read: boolean

  private constructor(data: NotificationProps) {
    this.id = data.id ?? randomUUID()
    this.userId = data.userId
    this.title = data.title
    this.message = data.message
    this.type = data.type
    this.entityId = data.entityId
    this.createdAt = data.createdAt
    this.read = data.read
  }
  public static build(data: NotificationProps) {
    return new Notification(data)
  }

    public getId(): string {
    return this.id
  }

  public getUserId(): string {
    return this.userId
  }

  public getTitle(): string {
    return this.title
  }

  public getMessage(): string {
    return this.message
  }

  public getType(): NotificationType {
    return this.type
  }

  public getEntityId(): string | undefined {
    return this.entityId
  }

  public getCreatedAt(): Date {
    return this.createdAt
  }

  public getRead(): boolean {
    return this.read
  }
}
