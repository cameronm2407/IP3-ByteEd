import express from 'express';
////////////////////////////////
import userRouter from './routers/userRouter.js';

const app = express();

// Global middleware
app.use(express.json()); // parse json requests

// mount routers
app.use('/api/user', userRouter);

export default app;
