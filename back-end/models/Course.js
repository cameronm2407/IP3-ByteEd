import { Schema, model } from 'mongoose';
import CrudOperator from '../classes/CrudOperator.js';
import Video from './Video.js';
import { deleteAsset } from '../utilities/cloudinary.js';

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
  videos: [{ type: Schema.Types.ObjectId, ref: 'Video', default: [] }],
  programming_language: { type: String },
  description: { type: String, required: true },
  creator: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

courseSchema.post('findOneAndDelete', async function () {
  const id = this.getFilter()._id.toString();
  try {
    // Delete associated thumbnail
    const deletedImageResult = await deleteAsset(
      `IP3-ByteEd-resources/course_thumbnails/image_id_${id}`,
      'image'
    );
    console.log({ deletedImageResult });
  } catch (err) {
    console.log(err);
  }
});

const Course = model('Course', courseSchema);

export default Course;
