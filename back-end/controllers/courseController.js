import catchAsyncError from '../utilities/catchAsyncError.js';
import CrudOperator from '../classes/CrudOperator.js';
import Video from '../models/Video.js';

const videoOperator = new CrudOperator(Video);

export default class CourseController {
  constructor(Model) {
    this.crudOperator = new CrudOperator(Model);
  }

  createCourse() {
    return catchAsyncError(async (req, res) => {
      const { body } = req;
      const course = await this.crudOperator.create(body);
      res.status(200).json({ status: 'success', course });
    });
  }

  addVideosToCourse() {
    return catchAsyncError(async (req, res) => {
      const courseId = req.query.courseId;
      const uploadedMetadata = req.uploadedMetadata;
      const videoIds = uploadedMetadata.map(entry => entry._id);
      const course = await this.crudOperator.update(courseId, {
        $push: { videos: { $each: videoIds } },
      });
      res.status(200).json({ status: 'success', uploadedMetadata, course });
    });
  }

  getCourses() {
    return catchAsyncError(async (req, res) => {
      const video = req.query.video;
      let query = req.query ? req.query : {};
      if (query.id) {
        query._id = query.id;
        delete query.id;
      }
      if (video) query = { videos: { $elemMatch: { $eq: video } } };
      console.log(query);
      const courses = await this.crudOperator.read(query);
      res.status(200).json({ status: "success", courses });
    });
  }

  update() {
    return catchAsyncError(async (req, res) => {
      const data = req.body;
      const { id } = req.query;
      const updated = await this.crudOperator.update(id, data);
      res.status(200).json({ status: 'success', updated });
    });
  }

  delete() {
    return catchAsyncError(async (req, res) => {
      const { id } = req.query;
      const videos = (await this.crudOperator.read({ _id: id }))[0].videos;

      //Delete associated videos
      videos.forEach(async id => {
        await videoOperator.delete(id.toString());
        console.log(`Video document ${id} deleted successfully`);
      });

      await this.crudOperator.delete(id);
      console.log(`Course document ${id} deleted successfully`);
      res.status(204).end();
    });
  }
}
