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
      const user = await this.crudOperator.create(payload);
      user.password = null;
      const authController = new AuthController();
      const token = await authController.createJwt(
        { user },
        process.env.JWT_SECRET
      );
      res.status(200).json({ status: 'success', token, user });
    });
  }

  updateUser() {
    return catchAsyncError(async (req, res) => {
      const _id = req.user._id;
      const updatedData = req.body;
      if (updatedData.password) delete updatedData.password; // cannot update passwords in this way
      const updatedUser = await this.crudOperator.update(_id, updatedData);
      updatedUser.password = null;
      res.status(200).json({ status: 'success', updatedUser });
    });
  }
}
