
import { ResourceAlreadyExistsException } from '@/core/exceptions/resource/ResourceAlreadyExistsException.js';
import { ResourceNotFoundException } from '@/core/exceptions/ResourceNotFoundException.js';
import { socketAuthMiddleware } from '@/infra/http/middlewares/socket-auth.js';
import { Server as HttpServer } from 'http';
import { Server as SocketIOServer, Socket } from 'socket.io';

export class SocketService {
    private static io: SocketIOServer | null = null;
    private static ipConnection: Map<string, string> = new Map();

    private constructor() { }

    private static getIp(socket: Socket): string {
        return (socket.handshake.headers['x-forwarded-for'] as string) || socket.handshake.address;
    }

    public static createServer(httpServer: HttpServer): SocketIOServer {
        if (this.io) return this.io;

        this.io = new SocketIOServer(httpServer, {
            cors: { origin: '*' }
        });

        this.io.use(socketAuthMiddleware);
        this.io.on('connection', this.handleConnection.bind(this));

        console.log('Socket.IO server is running');
        return this.io;
    }

    private static validateConnection(socket: Socket, next: (err?: any) => void): void {
        const ip = this.getIp(socket);
        if (this.ipConnection.has(ip)) {
            return next(new ResourceAlreadyExistsException());
        }
        console.log(`Nova conexão permitida do IP: ${ip}`);
        next();
    }

    private static handleConnection(socket: Socket): void {
        const ip = this.getIp(socket);

        this.ipConnection.set(ip, socket.id);
        console.log(`Socket conectado: ${socket.id} do IP ${ip}`);

        socket.on('disconnect', () => {
            this.ipConnection.delete(ip);
            console.log(`Socket desconectado: ${socket.id} do IP ${ip}`);
        });
    }

    public static getInstance(): SocketIOServer {
        if (!this.io) {
            throw new ResourceNotFoundException();
        }
        return this.io;
    }

    public static emit(eventName: string, payload: any): void {
        if (!this.io) {
            throw new ResourceNotFoundException();
        }
        this.io.emit(eventName, payload);
        console.log(`[Socket.IO] Evento '${eventName}' emitido`);
    }

    public static emitToUser(userId: string, eventName: string, payload: any): void {
        if (!this.io) {
            throw new ResourceNotFoundException();
        }
        this.io.to(`user:${userId}`).emit(eventName, payload);
        console.log(`[Socket.IO] Evento '${eventName}' emitido para o usuário ${userId}`);
    }

    public static emitToRole(role: string, eventName: string, payload: any): void {
        if (!this.io) {
            throw new ResourceNotFoundException();
        }
        this.io.to(`role:${role}`).emit(eventName, payload);
        console.log(`[Socket.IO] Evento '${eventName}' emitido para o papel role:${role}`);
    }
}