import { Schema, model } from 'mongoose';

const courseSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  creator: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

const Course = model('Course', courseSchema);

export default Course;
