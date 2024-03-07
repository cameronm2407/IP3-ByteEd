import { Schema, model } from 'mongoose';

const courseVideoSchema = new Schema({
  course_id: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
  video_id: { type: Schema.Types.ObjectId, ref: 'Video', required: true },
  position: { type: Number, required: true },
  added_at: { type: Date, default: Date.now },
});

const CourseVideo = model('CourseVideo', courseVideoSchema);

export default CourseVideo;
