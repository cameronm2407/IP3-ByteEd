import { Router } from 'express';
import UserController from '../controllers/userController.js';
import User from '../models/User.js';

const userController = new UserController(User);

// Router for all user related routes
const userRouter = Router();
userRouter.post('/register', userController.createUser());

export default userRouter;
