import { Router } from 'express';
import CourseController from '../controllers/courseController.js';
import AuthController from '../controllers/authController.js';
import Course from '../models/Course.js';
import User from '../models/User.js';

const authController = new AuthController(User);
const courseController = new CourseController(Course);

const courseRouter = Router();

courseRouter.get('/', courseController.getCourses());

// courseRouter.use(
//   authController.protect(),
//   authController.mustBe('content_creator')
// );

courseRouter
  .route('/')
  .post(courseController.createCourse())
  .put(courseController.update())
  .delete(courseController.delete());

export default courseRouter;
