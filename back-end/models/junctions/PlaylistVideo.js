import { Schema, model } from 'mongoose';

const playlistVideoSchema = new Schema({
  playlist_id: { type: Schema.Types.ObjectId, ref: 'Playlist', required: true },
  video_id: { type: Schema.Types.ObjectId, ref: 'Video', required: true },
  position: { type: Number, required: true },
  added_at: { type: Date, default: Date.now },
});

const PlaylistVideo = model('PlaylistVideo', playlistVideoSchema);

export default PlaylistVideo;
