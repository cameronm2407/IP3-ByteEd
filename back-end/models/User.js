import bcryptjs from 'bcryptjs';
const { genSalt, hash, compare } = bcryptjs;
import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ['learner', 'content_creator'],
    required: true,
  },
  registration_date: { type: Date, default: Date.now },
  location: { type: String },
  avatar: { type: String, required: true },
  bio: { type: String },
  analytics: {
    audience_demographics: {
      age: { type: Number },
      gender: { type: String },
      location: { type: String },
    },
  },
});

// hash password on user account registration
userSchema.pre('save', async function (next) {
  if (!this.isNew) return next();

  const salt = await genSalt(12);
  this.password = await hash(this.password, salt);

  next();
});

// instance method for password comparison
userSchema.methods.comparePassword = async function (plainTextPassword) {
  return await compare(plainTextPassword, this.password);
};

const User = model('User', userSchema);

export default User;
