import { Schema, model } from 'mongoose';

const courseSchema = new Schema({
  name: { type: String, required: true },
  thumbnail: { type: String, required: true },
  difficulty: {
    type: String,
    enum: {
      values: ['beginner', 'intermediate', 'advanced'],
      message: 'Difficulty must be beginner, intermediate or advanced',
    },
  },
  tags: { type: String },
  programming_language: { type: String },
  description: { type: String, required: true },
  creator: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

const Course = model('Course', courseSchema);

export default Course;
