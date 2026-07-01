import express from "express"
import { 
    createMessage,
    getConversation,
} from "../controllers/messageController.js"

const router = express.Router()

/**
 * @swagger
 * /api/messages:
 *   post:
 *     summary: Send a message
 *     tags:
 *       - Messages
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - text
 *               - sender
 *               - receiver
 *             properties:
 *               text:
 *                 type: string
 *                 example: Hello
 *               sender:
 *                 type: string
 *                 example: 6866c61a1234567890abcdef
 *               receiver:
 *                 type: string
 *                 example: 6866c61a1234567890abcdea
 *     responses:
 *       201:
 *         description: Message sent successfully
 */
router.post("/", createMessage)

/**
 * @swagger
 * /api/messages/{sender}/{receiver}:
 *   get:
 *     summary: Get conversation between two users
 *     tags:
 *       - Messages
 *     parameters:
 *       - in: path
 *         name: sender
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: receiver
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Conversation fetched successfully
 */
router.get("/:sender/:receiver", getConversation)

export default router