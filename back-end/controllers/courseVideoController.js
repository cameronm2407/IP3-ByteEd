import catchAsyncError from '../utilities/catchAsyncError.js';

export default class CourseVideoController {
  constructor(crudOperator) {
    this.crudOperator = crudOperator;
  }

  createCourseVideos() {
    return catchAsyncError(async (req, res) => {
      const data = [];
      const courseId = req.query.courseId;
      const uploadedMetadata = req.uploadedMetadata;

      uploadedMetadata.forEach(entry => {
        const doc = {
          course_id: courseId,
          video_id: entry._id,
        };
        data.push(doc);
      });
      const courseVideos = await this.crudOperator.create(data, true);
      res
        .status(200)
        .json({ status: 'success', uploadedMetadata, courseVideos });
    });
  }
}
