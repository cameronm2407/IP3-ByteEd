import { Schema, model } from 'mongoose';

const videoSchema = new Schema({
  title: { type: String, required: true },
  duration: { type: Number, required: true },
  description: { type: String },
  url: { type: String, required: true },
  thumbnail: { type: String, required: true },
  creator: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

const Video = model('Video', videoSchema);

export default Video;
