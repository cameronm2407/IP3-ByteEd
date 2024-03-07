import { Schema, model } from 'mongoose';

const videoProgressSchema = new Schema({
  video_id: { type: Schema.Types.ObjectId, ref: 'Video', required: true },
  user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  progress: { type: Number, min: 0, max: 100 },
  completed: { type: Boolean, default: false },
  started_at: { type: Date, default: Date.now },
  last_watched_at: { type: Date, default: Date.now },
});

const VideoProgress = model('VideoProgress', videoProgressSchema);

export default VideoProgress;
