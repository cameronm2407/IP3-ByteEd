import { Router } from 'express';
import UserController from '../controllers/userController.js';
import User from '../models/User.js';
import AuthController from '../controllers/authController.js';

const userController = new UserController(User);
const authController = new AuthController(User);

// Router for all user related routes
const userRouter = Router();
userRouter.post('/register', userController.createUser());
userRouter.post('/login', authController.login());
userRouter.use(authController.protect());
userRouter.post('/update', userController.updateUser());

export default userRouter;
