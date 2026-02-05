import { ValidationToken } from "@/adapters/lib/validation-socket.js";
import { Socket } from "socket.io";

export function socketAuthMiddleware(socket: Socket, next: (err?: Error) => void) {
    const token = socket.handshake.auth?.token ||
        socket.handshake.query?.token ||
        socket.handshake.headers?.authorization?.split(" ")[1];

    if (!token) return next(new Error("Token not provided"));

    try {
        const validator = new ValidationToken("");
        socket.data.user = validator.validate(token);
        socket.join(`user:${socket.data.user.id}`);
        if (socket.data.user.role?.name) {
            socket.join(`role:${socket.data.user.role.name}`);
        }
        next();
    } catch (error) {
        next(new Error("Invalid Token"));
    }
}