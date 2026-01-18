import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import { router } from "@/infra/http/express/routes.js"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3333

app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(router)

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`)
})

