import mongoose, { Schema } from 'mongoose';
import config from 'config';

export const LibraryCollectionName: string = `${config.get('General.dbConfig.collectionPrefix')}libraries`;
export const LibrarySchema: Schema = new Schema({
    name: { type: String, required: true },
    playlists: [{ type: Schema.Types.ObjectId } ]
});

export const Library = mongoose.model('Library', LibrarySchema, LibraryCollectionName);