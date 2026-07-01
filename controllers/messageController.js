import User from "../models/User.js"
import Message from "../models/Message.js"
import mongoose from "mongoose"
import { onlineUsers, getIO } from "../socket.js"

export const createMessage = async (req, res) => {
    try {
        const { text, sender, receiver } = req.body

        // validation
        if(!text || !text.trim() || !sender || !receiver) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }

        // validate sender objectId
        if(!mongoose.Types.ObjectId.isValid(sender)) {
            return res.status(400).json({
                success: false,
                message: "Invalid sender id"
            })
        }

        // check sender exists
        const existingSender = await User.findById(sender)

        if(!existingSender) {
            return res.status(404).json({
                success: false,
                message: "Sender not found",
            })
        }

        // validate receiver objectId
        if(!mongoose.Types.ObjectId.isValid(receiver)) {
            return res.status(400).json({
                success: false,
                message: "Invalid receiver id",
            })
        }

        // check receiver exists
        const existingReceiver = await User.findById(receiver)

        if(!existingReceiver) {
            return res.status(404).json({
                success: false,
                message: "Receiver not found",
            })
        }

        // for trim text
        const cleanedText = text.trim()

        // create message
        const message = new Message({
            text: cleanedText,
            sender,
            receiver,
        })

        // save 
        const savedMessage = await message.save()

        // fetch the populate version
        const populatedMessage = await Message.findById(savedMessage._id)
            .populate("sender", "username")
            .populate("receiver", "username")
        
        // receiver socket
        const receiverSocketId = onlineUsers.get(receiver)

        if(receiverSocketId) {
            const io = getIO()

            io.to(receiverSocketId).emit("receive-message", populatedMessage)
        }

        // response
        return res.status(201).json({
            success: true,
            message: "Message created successfully",
            data: populatedMessage,
        })
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

// get conversation
export const getConversation = async (req, res) => {
    try {
        const { sender, receiver } = req.params

        // ObjectId validation for sender
        if(!mongoose.Types.ObjectId.isValid(sender)) {
            return res.status(400).json({
                success: false,
                message: "Invalid sender id",
            })
        }

        // check the sender exists
        const existingSender = await User.findById(sender)

        if(!existingSender){
            return res.status(404).json({
                success: false,
                message: "Sender not found",
            })
        }

        // ObjectId validation for receiver
        if(!mongoose.Types.ObjectId.isValid(receiver)) {
            return res.status(400).json({
                success: false,
                message: "Invalid receiver id",
            })
        }

        // check the receiver exists
        const existingReceiver = await User.findById(receiver)

        if(!existingReceiver) {
            return res.status(404).json({
                success: false,
                message: "Receiver not found",
            })
        }

        // fetch the conversation
        const conversation = await Message.find({
            $or: [
                {
                    sender,
                    receiver,
                },
                {
                    sender: receiver, 
                    receiver: sender,
                }
            ]
        })
        .populate("sender", "username")
        .populate("receiver", "username")
        .sort({ createdAt: 1 })

        // response
        return res.status(200).json({
            success: true,
            count: conversation.length,
            data: conversation,
        })
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}