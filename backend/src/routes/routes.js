import express from 'express';
import { registerController } from '../controller/auth/register.controller.js';
import loginController from '../controller/auth/login.controller.js';
import { logoutController } from '../controller/auth/logout.controller.js';

const route = express.Router();

route.post('/auth/register', registerController);
route.post('/auth/login', loginController);
route.post('/auth/logout', logoutController);

export default route