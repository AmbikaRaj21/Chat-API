export const onlineUsers = new Map()

let io

export const initializeSocket = (socketIo) => {
    io = socketIo

    io.on("connection", (socket) => {
        // socket connected
        console.log("Socket connected: ", socket.id)

        // listen for user-connected
        socket.on("user-connected", (userId) => {
            // store userId and socket.id in the map
            onlineUsers.set(userId, socket.id)

            console.log(`User ${userId} connected`)
        })

        socket.on("disconnect", () => {
            for(const [userId, socketId] of onlineUsers) {
                if(socketId === socket.id) {
                    onlineUsers.delete(userId)

                    console.log(`User ${userId} disconnected`)
                    break
                }
            }
        })
    })
}

export const getIO = () => io