import bcrypt from "bcryptjs";
import { generateToken, isEmpty } from "../../lib/utils.js";
import User from "../../models/user.model.js";
import { ENV } from "../../lib/env.js";

const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (isEmpty(email)) {
            return res.status(400).json({
                statusCode: 400,
                success: false,
                message: "Email is required"
            });
        }

        if (isEmpty(password)) {
            return res.status(400).json({
                statusCode: 400,
                success: false,
                message: "Password is required"
            });
        }

        if (!emailRegex.test(email)) {
            return res.status(400).json({
                statusCode: 400,
                success: false,
                message: "Email should be valid"
            });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({
                statusCode: 401,
                success: false,
                message: "Invalid email or password"
            });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (!isPasswordMatch) {
            return res.status(401).json({
                statusCode: 401,
                success: false,
                message: "Invalid email or password"
            });
        }

        // Generate JWT token
        generateToken(user._id, res, ENV.CLIENT_URL);

        return res.status(200).json({
            statusCode: 200,
            success: true,
            message: "User logged in successfully",
            user: {
                id: user._id,
                fullName: user.fullName,
                email: user.email,
                profilePhoto: user.profilePhoto
            }
        });

    } catch (error) {
        console.error("Error from login controller: ", error);
        return res.status(500).json({
            statusCode: 500,
            success: false,
            message: error.message || "Internal Server Error"
        });
    }
};

export default loginController;