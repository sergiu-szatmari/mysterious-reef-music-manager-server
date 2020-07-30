import mongoose, {Schema} from 'mongoose';
import { SongSchema } from "./Song";

const collectionName: string = `${process.env.DB_COLLECTION_NAME_PREFIX || 'sergiu_'}playlists`;
export const PlaylistSchema: Schema = new Schema<any>({
    name: { type: String, required: true },
    songs: [ SongSchema ]
});

export const Playlist = mongoose.model('Playlist', PlaylistSchema, collectionName);