import express from 'express';
import { registerController } from '../controller/auth/register.controller.js';
import loginController from '../controller/auth/login.controller.js';
import { logoutController } from '../controller/auth/logout.controller.js';
import { protectedRoute } from '../middleware/auth.middleware.js';
import { updateUserController } from '../controller/user/updateUser.controller.js';
import { arcjetProtection } from '../middleware/arject.middleware.js';
import getContactListController from '../controller/message/contacts.controller.js';
import getMessagesByIDController from '../controller/message/getMessagesByID.controller.js';
import sendMessageControler from '../controller/message/sendMessage.controller.js';
import chatListController from '../controller/message/chats.controller.js';

const route = express.Router();

// route.use(arcjetProtection)
route.post('/auth/register', registerController);
route.post('/auth/login', loginController);
route.post('/auth/logout', protectedRoute,logoutController);
route.put('/auth/update-profile-photo', protectedRoute,updateUserController);
route.get('/auth/check-user', protectedRoute,(req,res)=> res.status(200).json(req.user));


route.get('/message/get-contact-list',protectedRoute, getContactListController)
route.get('/message/:id',protectedRoute, getMessagesByIDController)
route.post('/send/:id',protectedRoute, sendMessageControler)
route.get('/get-chat-list',protectedRoute, chatListController)
export default route