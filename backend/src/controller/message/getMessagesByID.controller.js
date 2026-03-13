import Message from "../../models/message.model.js";

const getMessagesByIDController = async(req, res)=>{
    try {
        const myId = req.user._id;
        const messageToUserID = req.params.id;

        const Messages = await Message.find({
            $or:[
                {recieverId: myId, senderId: messageToUserID},
                 {recieverId: messageToUserID, senderId: myId}
            ]
        })

        return res.status(200).json({
            success: true,
            statuCode: 200,
            message: 'Messages successfully listed',
            messages:Messages
        })
    } catch (error) {
        console.log('Error from getMessagesByIDController: ',error);
        
           return res.status(500).json({
            success: true,
            statuCode: 500,
            message: error.message || 'Internal server error',
        })
    }
}


export default getMessagesByIDController