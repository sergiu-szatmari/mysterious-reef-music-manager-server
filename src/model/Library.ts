import mongoose, { Schema } from 'mongoose';

export const LibraryCollectionName: string = `${process.env.DB_COLLECTION_NAME_PREFIX || 'sergiu-'}libraries`;
export const LibrarySchema: Schema = new Schema({
    name: { type: String, required: true },
    playlists: [{ type: Schema.Types.ObjectId } ]
});

export const Library = mongoose.model('Library', LibrarySchema, LibraryCollectionName);