import { Router } from 'express';
import VideoController from '../controllers/videoController.js';
import CrudOperator from '../classes/CrudOperator.js';
import AuthController from '../controllers/authController.js';
import CourseVideoController from '../controllers/courseVideoController.js';
import SearchEngine from '../classes/SearchEngine.js';
import Video from '../models/Video.js';
import Course from '../models/Course.js';
import User from '../models/User.js';
import CourseVideo from '../models/junctions/CourseVideo.js';

const videoOperator = new CrudOperator(Video);
const courseOperator = new CrudOperator(Course);
const searchEngine = new SearchEngine(videoOperator, courseOperator);

const authController = new AuthController(User);
const videoController = new VideoController(videoOperator, searchEngine);
const courseVideoController = new CourseVideoController(CourseVideo);

// Router for educational recourses video routes
const videoRouter = Router();
videoRouter.get('/search', videoController.search());
videoRouter.get('/', videoController.getVideos());

// videoRouter.use(
//   authController.protect(),
//   authController.mustBe('content_creator')
// );

videoRouter
  .route('/')
  .put(videoController.update())
  .delete(videoController.delete());

videoRouter.post('/upload', videoController.uploadMetadata());
videoRouter.post(
  '/upload/course-content',
  videoController.uploadMetadata(true),
  courseVideoController.createCourseVideos()
);

export default videoRouter;
