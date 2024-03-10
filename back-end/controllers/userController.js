import CrudOperator from '../classes/CrudOperator.js';
import catchAsyncError from '../utilities/catchAsyncError.js';

export default class UserController {
  constructor(Model) {
    this.Model = Model;
    this.crudOperator = new CrudOperator(this.Model);
  }

  createUser() {
    return catchAsyncError(async (req, res) => {
      const payload = req.body;
      const newUser = await this.crudOperator.create(payload);
      res.status(200).json({ status: 'success', newUser });
    });
  }
}
