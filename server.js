import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import connectDB from "./config/db.js"
import userRoutes from "./routes/userRoutes.js"
import messageRoutes from "./routes/messageRoutes.js"
import http from "http"
import { Server } from "socket.io"
import { initializeSocket } from "./socket.js"
import swaggerUi from "swagger-ui-express"
import swaggerSpec from "./config/swagger.js"

const app = express()

const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
})

initializeSocket(io)

dotenv.config()

connectDB()

app.use(express.json())

app.use(cors())

app.use("/api/users", userRoutes)
app.use("/api/messages", messageRoutes)

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec))

app.get("/", (req, res) => {
    res.send("Chat API is running")
})

const PORT = process.env.PORT || 5000

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})