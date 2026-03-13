import Cloudinary from "../../lib/cloudinary.js";
import Message from "../../models/message.model.js";

const sendMessageControler = async (req, res) => {
    try {
        const { text, image } = req.body;
        const { id: recieverId } = req.params;
        const senderId = req.user._id;

        let imageUrl;
        if (image) {
            const uploadPhoto = await Cloudinary.uploader.upload(profilePhoto);
            imageUrl = uploadPhoto.secure_url
        }

        const Messages = await Message.create({
            senderId,
            recieverId,
            text,
            image: imageUrl
        })
        await Messages.save();


         return res.status(201).json({
            statusCode: 201,
            success: true,
            message: "Message sent successfully",
            messages: Messages
        })

    } catch (error) {
  console.log('Error from sendMessageControler: ', error);

        return res.status(500).json({
            statusCode: 500,
            success: false,
            message: error.message || "Internal server error",
        })
    }
}

export default sendMessageControler