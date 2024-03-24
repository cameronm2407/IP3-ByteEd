import catchAsyncError from '../utilities/catchAsyncError.js';
import CrudOperator from '../classes/CrudOperator.js';

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

  getCourses() {
    return catchAsyncError(async (req, res) => {
      const query = req.query ? req.query : {};
      if (query.id) {
        query._id = query.id;
        delete query.id;
      }
      const courses = await this.crudOperator.read(query);
      res.status(200).json({ status: 'success', courses });
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
      await this.crudOperator.delete(id);
      res.status(204).end();
    });
  }
}
