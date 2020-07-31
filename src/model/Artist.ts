import mongoose, { Schema } from 'mongoose';
import { MongoDBValidator } from '../middleware';

export const ArtistCollectionName: string = `${process.env.DB_COLLECTION_NAME_PREFIX || 'sergiu-'}artists`;
export const ArtistSchema: Schema = new Schema<any>({
    name: {
        type: String,
        required: true,
        validate: {
            validator: MongoDBValidator.validateString,
            message: props => `${props.value} is invalid`
        }
    },
    birthDate: { type: Date, default: Date.parse('1990-01-01') },
    originCountry: { type: String, default: 'Unknown' }
});

export const Artist = mongoose.model('Artist', ArtistSchema, ArtistCollectionName);