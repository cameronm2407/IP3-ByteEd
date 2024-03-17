import { Router } from 'express';
import VideoController from '../controllers/videoController.js';
import CrudOperator from '../classes/CrudOperator.js';
import SearchEngine from '../classes/SearchEngine.js';
import Video from '../models/Video.js';
import Course from '../models/Course.js';

const videoOperator = new CrudOperator(Video);
const courseOperator = new CrudOperator(Course);
const searchEngine = new SearchEngine(videoOperator, courseOperator);

const videoController = new VideoController(null, searchEngine);

// Router for educational recourses eg. video, course etc.
const contentRouter = Router();
contentRouter.get('/search', videoController.search());

export default contentRouter;
