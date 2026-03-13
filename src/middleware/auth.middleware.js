import jwt from 'jsonwebtoken'
import { ENV } from '../lib/env.js';
import User from '../models/user.model.js';

export const protectedRoute = async (req, res, next) => {
    try {
        
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({
                statusCode: 401,
                success: false,
                message: "Unauthorized - No token provided",
            })
        }

        const decode = jwt.verify(token, ENV.JWT_SECRET);

        if (!decode) {
            return res.status(401).json({
                statusCode: 401,
                success: false,
                message: "Unauthorized - Invalid provided",
            })
        }

        const user = await User.findById(decode.userId)

        if (!user) {
            return res.status(404).json({
                statusCode: 404,
                success: false,
                message: "User does not exist",
            })
        }
        req.user = user
        console.log('req.user: ',req.user);
        
        next()
    } catch (error) {
        console.error("Error from register protectedRoute:", error);
        return res.status(500).json({
            statusCode: 500,
            success: false,
            message: error.message || "Internal Server Error",
        });
    }
}