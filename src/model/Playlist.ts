import mongoose, { Schema } from 'mongoose';

export const PlaylistCollectionName: string = `${process.env.DB_COLLECTION_NAME_PREFIX || 'sergiu-'}playlists`;
export const PlaylistSchema: Schema = new Schema({
    name: { type: String, required: true },
    songs: [{ type: Schema.Types.ObjectId } ]
});

export const Playlist = mongoose.model('Playlist', PlaylistSchema, PlaylistCollectionName);