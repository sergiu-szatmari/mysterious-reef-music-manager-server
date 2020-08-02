import mongoose, { Schema } from 'mongoose';
import config from 'config';

export const PlaylistCollectionName: string = `${config.get('General.dbConfig.collectionPrefix')}playlists`;
export const PlaylistSchema: Schema = new Schema({
    name: { type: String, required: true },
    songs: [{ type: Schema.Types.ObjectId } ]
});

export const Playlist = mongoose.model('Playlist', PlaylistSchema, PlaylistCollectionName);