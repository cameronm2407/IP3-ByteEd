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
      const { email, password } = req.body;
      if (!email || !password)
        throw new OperationalError(
          'Fields missing! Please enter email and password'
        );

      const user = (await this.crudOperator.read({ email }))[0];
      if (!user)
        throw new OperationalError('No user with this email was found');

      const correctPassword = await user.comparePassword(password);
      if (!correctPassword)
        throw new OperationalError('Password incorrect, please try again');

      user.password = null;
      const token = await this.createJwt({ user }, process.env.JWT_SECRET);

      res.status(200).json({ status: 'success', user, token });
    });
  }

  // Protect route based on auth state
  protect() {
    return catchAsyncError(async (req, _, next) => {
      // 1. Check if token exists
      const token = req.headers.authorization?.split(' ')[1];
      if (!token)
        throw new OperationalError(
          'Unauthorized: Please authenticate to access.'
        );
      // 2. Verify token, make sure token payload has not been tampered with
      const decoded = await this.verifyToken(token, process.env.JWT_SECRET);
      // 3. Check if user still exists
      // Without this step someone can be authenticated with only the token even if their account no longer exists
      const user = (await this.crudOperator.read({ _id: decoded.user._id }))[0];
      if (!user)
        throw new OperationalError(
          'User no longer exists and therefore is not authorized'
        );
      // grant access to protected route
      req.user = user;
      next();
    });
  }

  // role based access control
  mustBe(authorizedRole) {
    return (req, _, next) => {
      const { role } = req.user;
      if (role !== authorizedRole)
        throw new OperationalError(
          'Access denied: you are not authorized to perform this action'
        );
      next();
    };
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
