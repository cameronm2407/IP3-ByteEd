import express from 'express';
////////////////////////////////
import router from './routers/initRouter.js';

const app = express();

// Global middleware - runs for every request
app.use(express.json()); // parse json requests

// mount routers
app.use('/', router);

export default app;
