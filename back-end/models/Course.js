import { Schema, model } from 'mongoose';
import CrudOperator from '../classes/CrudOperator.js';
import CourseVideo from '../models/junctions/CourseVideo.js';
import Video from './Video.js';
import { deleteAsset } from '../classes/cloudinaryUtils.js';

const courseVideoOperator = new CrudOperator(CourseVideo);
const videoOperator = new CrudOperator(Video);

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

courseSchema.post('findOneAndDelete', async function () {
  const id = this.getFilter()._id.toString();
  try {
    // Delete associated videos
    const videosToDelete = await courseVideoOperator.read({ course_id: id });
    Promise.all(
      videosToDelete.map(doc => videoOperator.delete(doc.video_id))
    ).then(() => console.log('Video documents deleted successfully'));

    // Delete associated course video association documents
    await courseVideoOperator.deleteMany({ course_id: id });
    console.log('Course video association documents deleted successfully');

    // Delete associated image
    const deletedImageResult = await deleteAsset(
      `IP3-ByteEd-resources/course_thumbnails/image_id_${id}`,
      'image'
    );
    console.log({ deletedImageResult });
  } catch (error) {
    console.log(error);
  }
});

const Course = model('Course', courseSchema);

export default Course;
