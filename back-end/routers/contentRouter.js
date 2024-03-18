import { Router } from 'express';
import VideoController from '../controllers/videoController.js';
import CrudOperator from '../classes/CrudOperator.js';
import AuthController from '../controllers/authController.js';
import CourseController from '../controllers/courseController.js';
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
const courseController = new CourseController(courseOperator);
const courseVideoController = new CourseVideoController(CourseVideo);

// Router for educational recourses eg. video, course etc.
const contentRouter = Router();
contentRouter.get('/search', videoController.search());
contentRouter.get('/videos', videoController.getVideos());
contentRouter.get('/courses', courseController.getCourses());

contentRouter.use(
  authController.protect(),
  authController.mustBe('content_creator')
);

contentRouter.post('/video/upload', videoController.uploadMetadata());
contentRouter.post(
  '/course/video/upload',
  videoController.uploadMetadata(true),
  courseVideoController.createCourseVideos()
);

contentRouter
  .route('/video')
  .put(videoController.update())
  .delete(videoController.delete());

contentRouter
  .route('/course')
  .post(courseController.createCourse())
  .put(courseController.update())
  .delete(courseController.delete());

export default contentRouter;
