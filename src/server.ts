import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import { router } from "@/infra/http/express/routes.js"
import { errorHandler } from "./infra/http/middlewares/error-handler.js"
// import cookieParser from "cookie-parser";

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3333

app.use(express.json())
// UTILIZADO PARA JWT VIA HEADERS
app.use(cors())
// OBRIGATORIO PARA COOKIES
// app.use(cookieParser());
// UTILIZADO(CREDENTIALS:TRUE) PARA JWT VIA COOKIES PROIBIDO ORIGIN:"*"
// app.use(cors({
//     origin: "http://localhost:5173",
//     credentials: true,
// }))
app.use(express.urlencoded({ extended: true }))
app.use(router)
app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`)
})
