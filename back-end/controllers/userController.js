import CrudOperator from '../classes/CrudOperator.js';
import catchAsyncError from '../utilities/catchAsyncError.js';
import AuthController from './authController.js';

export default class UserController {
  constructor(Model) {
    this.crudOperator = new CrudOperator(Model);
  }

  createUser() {
    return catchAsyncError(async (req, res) => {
      const payload = req.body;
      const newUser = await this.crudOperator.create(payload);
      const authController = new AuthController(null);
      const token = authController.createJwt(newUser, process.env.JWT_SECRET);
      res.status(200).json({ status: 'success', token, newUser });
    });
  }
}
