import { Schema, model } from 'mongoose';

const courseProgressSchema = new Schema({
  course_id: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
  user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  videos_completed: [{ type: Schema.Types.ObjectId, ref: 'Video' }],
  started_at: { type: Date, default: Date.now },
  last_progressed_at: { type: Date, default: Date.now },
});

const CourseProgress = model('CourseProgress', courseProgressSchema);

export default CourseProgress;
