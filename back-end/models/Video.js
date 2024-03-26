import { Schema, model } from 'mongoose';
import { deleteAsset } from '../utilities/cloudinary.js';

const videoSchema = new Schema({
  title: { type: String, required: true },
  duration: { type: Number, required: true },
  description: { type: String },
  course_content: { type: Boolean, required: true },
  position: { type: Number },
  url: { type: String, required: true },
  thumbnail: { type: String, required: true },
  creator: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

videoSchema.post('findOneAndDelete', async function () {
  const id = this.getFilter()._id.toString();
  const deletedVideoResult = await deleteAsset(
    `IP3-ByteEd-resources/videos/video_id_${id}`,
    'video'
  );
  const deletedImageResult = await deleteAsset(
    `IP3-ByteEd-resources/video_thumbnails/image_id_${id}`,
    'image'
  );
  console.log({ deletedVideoResult, deletedImageResult });
});

const Video = model('Video', videoSchema);

export default Video;
