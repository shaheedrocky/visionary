import Cloudinary from "../../lib/cloudinary.js";
import User from "../../models/user.model.js";

export const updateUserController = async (req, res) => {
    try {
        const { profilePhoto } = req.body;
        if (!profilePhoto) {
            return res.status(400).json({
                statusCode: 400,
                success: false,
                message: "Profile photo is required",
            })
        }

        const userId = req.user._id
        const uploadPhoto = await Cloudinary.uploader.upload(profilePhoto);
        const updatedUserPhoto = await User.findByIdAndUpdate(userId, { profilePhoto: uploadPhoto.secure_url }, { new: true });
        return res.status(200).json({
            statusCode: 200,
            success: true,
            message: "Profile photo uploaded successfully",
            user: updatedUserPhoto
        })
    } catch (error) {
        console.log('Error from updateUserController: ', error);

        return res.status(500).json({
            statusCode: 500,
            success: false,
            message: error.message || "Internal server error",
        })
    }
}