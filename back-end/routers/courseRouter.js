import { Router } from 'express';
import CourseController from '../controllers/courseController.js';
import VideoController from '../controllers/videoController.js';
import AuthController from '../controllers/authController.js';
import CrudOperator from '../classes/CrudOperator.js';
import Course from '../models/Course.js';
import User from '../models/User.js';
import Video from '../models/Video.js';

const videoOperator = new CrudOperator(Video);
const authController = new AuthController(User);
const courseController = new CourseController(Course);
const videoController = new VideoController(videoOperator, null);

const courseRouter = Router();

courseRouter.get('/', courseController.getCourses());

courseRouter.use(
  authController.protect(),
  authController.mustBe('content_creator')
);

courseRouter
  .route('/')
  .post(courseController.createCourse())
  .put(courseController.update())
  .delete(courseController.delete());

courseRouter.post(
  '/upload/course-content',
  videoController.uploadMetadata(true),
  courseController.addVideosToCourse()
);

export default courseRouter;
