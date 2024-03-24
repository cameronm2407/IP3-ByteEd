import express from 'express';
import cors from 'cors';
////////////////////////////////
import userRouter from './routers/userRouter.js';
import videoRouter from './routers/videoRouter.js';
import courseRouter from './routers/courseRouter.js';

const app = express();

// Global middleware
app.use(express.json()); // parse json requests
app.use(cors());

// mount routers
app.use('/api/user', userRouter);
app.use('/api/content/video', videoRouter);
app.use('/api/content/course', courseRouter);

export default app;
