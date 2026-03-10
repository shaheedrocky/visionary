import express from 'express';
import { registerController } from '../controller/auth/register.controller.js';

const route = express.Router();

route.post('/auth/register', registerController)

export default route