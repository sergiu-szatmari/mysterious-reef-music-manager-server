import mongoose, { Schema } from 'mongoose';
import { ArtistSchema } from "./Artist";

const collectionName: string = `${process.env.DB_COLLECTION_NAME_PREFIX || 'sergiu_'}songs`;
export const SongSchema: Schema = new Schema({
    name: { type: String, required: true },
    artist: { type:ArtistSchema, required: true },
    duration: { type: Number, required: true },
    genre: { type: String, required: true },
    bpm: { type: Number, required: true },
    dateAdded: { type: Date, default: Date.now }
});

export const Song = mongoose.model('Song', SongSchema, collectionName);