import mongoose, { Schema } from 'mongoose';

const collectionName: string = `${process.env.DB_COLLECTION_NAME_PREFIX || 'sergiu_'}artists`;
export const ArtistSchema: Schema = new Schema<any>({
    name: { type: String, required: true },
    birthDate: { type: Date, default: Date.parse('1990-01-01') },
    originCountry: { type: String, default: 'Unknown' }
});

export const Artist = mongoose.model('Artist', ArtistSchema, collectionName);