import Message from "../../models/message.model.js";
import User from "../../models/user.model.js";

const chatListController = async (req, res) => {
    try {

        const loggedUserId = req.user._id;

        const messages = await Message.find({
            $or: [
                { senderId: loggedUserId },
                { recieverId: loggedUserId }
            ]
        });

        // get chat partner ids
        const userIds = messages.map((msg) => {

            if (!msg.senderId || !msg.recieverId) return null;

            return msg.senderId.toString() === loggedUserId.toString()
                ? msg.recieverId
                : msg.senderId;

        }).filter(Boolean);



        // remove duplicates
        const uniqueUserIds = [...new Set(userIds.map(id => id.toString()))];

        const users = await User
            .find({ _id: { $in: uniqueUserIds } })
            .select("-password");

        return res.status(200).json({
            success: true,
            message: "Chat users fetched successfully",
            users
        });

    } catch (error) {

        console.log("Error from chatListController:", error);

        return res.status(500).json({
            success: false,
            message: error.message || "Internal server error",
        });

    }
};

export default chatListController;