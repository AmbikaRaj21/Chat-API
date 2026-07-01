import { io } from "socket.io-client"

const socket = io("http://localhost:5000")

socket.on("connect", () => {
    console.log("Client 2 connected: ", socket.id)

    socket.emit("user-connected", "6a448b778963b7dc7c15612f")
})

socket.on("receive-message", (message) => {
    console.log("client 2 received:")
    console.log(message)
})