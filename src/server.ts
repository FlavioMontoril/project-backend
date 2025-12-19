import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import http from "http"
import { Server } from "socket.io"
import { router } from "@/infra/http/express/routes.js"
import * as jwt  from "jsonwebtoken"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3333

app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(router)

const httpServer = http.createServer(app)

export const io = new Server(httpServer, {
    cors: {
        origin: "*",
    },
})

// 🔐 Middleware de autenticação do socket
io.use((socket, next) => {
    const token = socket.handshake.auth?.token

    if (!token) {
        return next(new Error("Token não informado"))
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!)
        socket.data.userId = decoded.sub
        return next()
    } catch {
        return next(new Error("Token inválido"))
    }
})

// 🔌 Conexão
io.on("connection", (socket) => {
    const userId = socket.data.userId

    socket.join(userId)

    console.log("🔌 Socket conectado:", userId)

    socket.on("disconnect", () => {
        console.log("Socket desconectado:", userId)
    })
})

httpServer.listen(PORT, () => {
    console.log(`🚀 Server + Socket rodando na porta ${PORT}`)
})
