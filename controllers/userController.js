import User from "../models/User.js"

// create user
export const createUser = async (req, res) => {
    try {
        const { username } = req.body

        // validate data
        if(!username) {
            return res.status(400).json({
                success: false,
                message: "username is required",
            })
        }

        // check if username exists
        const existingUser = await User.findOne({
            username
        })

        if(existingUser) {
            return res.status(400).json({
                success: false,
                message: "Username already exists",
            })
        }

        // create user
        const user = new User({
            username,
        })

        // save user
        await user.save()

        return res.status(201).json({
            success: true,
            message: "User created successfully",
            data: user,
        })
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

// get all users
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find()

        return res.status(200).json({
            success: true,
            count: users.length,
            data: users,
        })
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}