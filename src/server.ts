import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import { router } from "@/infra/http/express/routes.js"
import { errorHandler } from "./infra/http/middlewares/error-handler.js"
import http from "http"
import { SocketService } from "./adapters/lib/socketIO-service.js"
import { ApplicationListeners } from "./core/events/listeners/_index.js"
// import cookieParser from "cookie-parser";

dotenv.config()

const app = express()
const server = http.createServer(app)
const PORT = process.env.PORT || 3333
// const CLIENT_URL = process.env.CLIENT_URL

app.use(express.json())
// UTILIZADO PARA JWT VIA HEADERS
app.use(cors())
// OBRIGATORIO PARA COOKIES
// app.use(cookieParser());
// UTILIZADO(CREDENTIALS:TRUE) PARA JWT VIA COOKIES PROIBIDO ORIGIN:"*"
// app.use(cors({
//     origin: CLIENT_URL,
//     credentials: true,
// }));
app.use(express.urlencoded({ extended: true }))
app.use(router)
app.use(errorHandler)

ApplicationListeners.listen();
SocketService.createServer(server);
server.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`)
})
