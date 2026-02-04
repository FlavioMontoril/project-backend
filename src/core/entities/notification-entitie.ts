import { randomUUID } from "crypto";

export interface NotificationProps {
  id?: string;
  content: string;
  triggeredId: string;
  entityType?: string;
  createdAt?: Date;
}

export class Notification {
  private readonly id: string;
  private content: string;
  private triggeredId: string;
  private entityType: string | null;
  private readonly createdAt: Date;

  private constructor(data: NotificationProps) {
    this.id = data.id ?? randomUUID();
    this.content = data.content;
    this.triggeredId = data.triggeredId;
    this.entityType = data.entityType ?? null;
    this.createdAt = data.createdAt ?? new Date();
  }

  public static build(data: NotificationProps) {
    return new Notification(data);
  }

  public getId(): string {
    return this.id;
  }

  public getContent(): string {
    return this.content;
  }

  public getTriggeredId(): string {
    return this.triggeredId;
  }

  public getEntityType(): string | null {
    return this.entityType;
  }

  public getCreatedAt(): Date {
    return this.createdAt;
  }

  public setContent(content: string = this.content) {
    this.content = content;
  }

  public setEntityType(entityType: string | null = this.entityType) {
    this.entityType = entityType;
  }

  public toJSON() {
    return {
      id: this.id,
      content: this.content,
      triggeredId: this.triggeredId,
      entityType: this.entityType,
      createdAt: this.createdAt,
    };
  }
}
