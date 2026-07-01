import { io } from "socket.io-client"

const socket = io("http://localhost:5000")

socket.on("connect", () => {
    console.log("Client 1 connected: ", socket.id)

    socket.emit("user-connected", "6a448b108963b7dc7c15612e")
})

socket.on("receive-message", (message) => {
    console.log("client 1 received:")
    console.log(message)
})