import { generateToken, isEmpty } from "../../lib/utils.js";
import bcrypt from "bcryptjs";
import User from "../../models/user.model.js";
import { emailSender } from "../../email/emailHandler.js";
import { ENV } from "../../lib/env.js";

export const registerController = async (req, res) => {
    try {
        const { fullName, email, password } = req.body;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        // Basic validations
        if (isEmpty(fullName) || isEmpty(email) || isEmpty(password)) {
            return res.status(400).json({
                statusCode: 400,
                success: false,
                message: "FullName, email, and password are required",
            });
        }

        if (password.length < 6) {
            return res.status(400).json({
                statusCode: 400,
                success: false,
                message: "Password must be at least 6 characters",
            });
        }

        if (!emailRegex.test(email)) {
            return res.status(400).json({
                statusCode: 400,
                success: false,
                message: "Email is not valid",
            });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                statusCode: 400,
                success: false,
                message: "User already exists, try another email",
            });
        }

        // Hash password and create user
        const hashPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ fullName, email, password: hashPassword });
        const savedUser = await newUser.save();

        // Generate JWT token
        generateToken(savedUser._id, res);

        // Send response first
        res.status(201).json({
            statusCode: 201,
            success: true,
            message: "User successfully created!",
            user: {
                id: savedUser._id,
                fullName: savedUser.fullName,
                email: savedUser.email,
                profilePhoto: savedUser.profilePhoto,
            },
        });

        // Send welcome email (non-blocking)
        const recipientEmail =
            process.env.NODE_ENV === "development" ? "shaheedsibil@gmail.com" : email;

        try {
            await emailSender(recipientEmail, fullName, ENV.CLIENT_URL);
        } catch (err) {
            console.log(`Failed to send email to ${fullName}:`, err);
        }
    } catch (error) {
        console.error("Error from register controller:", error);
        return res.status(500).json({
            statusCode: 500,
            success: false,
            message: error.message || "Internal Server Error",
        });
    }
};