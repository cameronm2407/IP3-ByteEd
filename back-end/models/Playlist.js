import { Schema, model } from 'mongoose';

const playlistSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  creator: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  visibility: { type: String, enum: ['public', 'private'], default: 'public' },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

const Playlist = model('Playlist', playlistSchema);

export default Playlist;
