import mongoose, { Schema } from 'mongoose';
import config from 'config';

import { MongoDBValidator } from '../middleware';

export const ArtistCollectionName: string = `${config.get('General.dbConfig.collectionPrefix')}artists`;
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