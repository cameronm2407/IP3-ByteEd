import express from 'express';
////////////////////////////////
import userRouter from './routers/userRouter.js';
import contentRouter from './routers/contentRouter.js';

const app = express();

// Global middleware
app.use(express.json()); // parse json requests

// mount routers
app.use('/api/user', userRouter);
app.use('/api/content', contentRouter);

export default app;
