import express from "express"
import { 
    createUser,
    getAllUsers, 
} from "../controllers/userController.js"

const router = express.Router()

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Create a new user
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *             properties:
 *               username:
 *                 type: string
 *                 example: Ambika
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Validation Error
 */
router.post("/", createUser)

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: List of all users
 */
router.get("/", getAllUsers)

export default router