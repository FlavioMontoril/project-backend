import { NotificationEmitter } from "@/core/ports/notification-emitter.js"
import { Notification } from "@/core/entities/notification-entity.js"
import { io } from "@/server.js"

export class SocketNotificationEmitter
  implements NotificationEmitter {

  emitToUser(
    userId: string,
    event: string,
    payload: Notification
  ): void {
    io.to(userId).emit(event, payload)
  }
}
