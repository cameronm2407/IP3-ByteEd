import { promisify } from 'node:util';
import jwt from 'jsonwebtoken';
import CrudOperator from '../classes/CrudOperator.js';
import catchAsyncError from '../utilities/catchAsyncError.js';
import OperationalError from '../classes/OperationalError.js';

export default class AuthController {
  constructor(Model) {
    this.crudOperator = Model ? new CrudOperator(Model) : null;
  }

  login() {
    return catchAsyncError(async (req, res) => {
      const { email, password } = req.query;
      if (!email || !password)
        throw new OperationalError(
          'Fields missing! Please enter email and password'
        );

      const user = await this.crudOperator.read({ email });
      if (user.length == 0)
        throw new OperationalError('No user with this email was found');

      const correctPassword = await user[0].comparePassword(password);
      if (!correctPassword)
        throw new OperationalError('Password incorrect, please try again');

      res.status(200).json({ status: 'success', user });
    });
  }

  protect() {
    return catchAsyncError(async (req, res) => {});
  }

  async createJwt(payload, secret) {
    const token = await promisify(jwt.sign)(payload, secret, {
      expiresIn: '182d', // approx 6 months
    });
    return token;
  }

  async verifyToken(token, secret) {
    const decoded = await promisify(jwt.verify)(token, secret);
    return decoded;
  }
}
