import { generateToken, isEmpty } from "../../lib/utils.js";
import bcrypt from 'bcryptjs';
import User from "../../models/user.model.js";

export const registerController = async (req, res) => {
    try {
        const { fullName, email, password } = req.body;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (isEmpty(fullName)) {
            return res.status(400).json({
                statusCode: 400,
                success: false,
                message: 'Fullname is required'
            })
        }
        if (isEmpty(email)) {
            return res.status(400).json({
                statusCode: 400,
                success: false,
                message: 'Email is required'
            })
        } if (isEmpty(password)) {
            return res.status(400).json({
                statusCode: 400,
                success: false,
                message: 'Password is required'
            })
        }

        if (password.length < 6) {
            return res.status(400).json({
                statusCode: 400,
                success: false,
                message: 'Password must be atleast 6 characters'
            })
        }

        if (!emailRegex.test(email)) {
            return res.status(400).json({
                statusCode: 400,
                success: false,
                message: 'Email should be valid'
            })
        }

        // hash the password
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password, salt);

        const user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({
                statusCode: 400,
                success: false,
                message: 'User already exists, Try with another email'
            })
        }

        const newUser = new User({
            fullName,
            email,
            password: hashPassword
        });

        if (newUser) {
            generateToken(newUser._id, res);
            await newUser.save();
            return res.status(201).json({
            statusCode: 201,
            success: true,
            message: 'User successfully created!',
            user:{
                id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                profilePhoto: newUser.profilePhoto
            }
        })
        } else {
            return res.status(400).json({
                statusCode: 400,
                success: false,
                message: 'Invalid user data'
            })
        }

       

    } catch (error) {
        console.log('Error from register controller: ', error);
        return res.status(500).json({
            statusCode: 500,
            success: false,
            message: error.message || 'Internal Server Error'
        })
    }
}