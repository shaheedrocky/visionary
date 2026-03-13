import User from "../../models/user.model.js";

const getContactListController = async(req, res)=>{
    try {        
        const loggedUserId = req.user._id;
        const filteredUser = await User.find({_id: {$ne: loggedUserId}}).select('-password');

        return res.status(200).json({
            success: true,
            statusCode: 200,
            message: 'User contacts successfully listed',
            user: filteredUser
        })

    } catch (error) {
        console.log('Error from getContactListController: ',error);
           return res.status(500).json({
            success: false,
            statusCode: 500,
            message: error.message || 'Internal server error',
        })
    }
}

export default getContactListController