import mongoose, { Schema } from 'mongoose';
import config from 'config';

import { MongoDBValidator } from '../middleware';

export const SongCollectionName: string = `${config.get('General.dbConfig.collectionPrefix')}songs`;
export const SongSchema: Schema = new Schema({
    name: {
        type: String,
        required: [true, 'Song\'s name is required'],
        validate: {
            validator: MongoDBValidator.validateString,
            message: props => `${props.value} is invalid`
        }
    },
    duration: { type: Number, required: [true, 'Song\'s duration is required'] },
    genre: {
        type: String,
        required: [true, 'Song\'s genre is required'],
        validate: {
            validator: MongoDBValidator.validateString,
            message: props => `${props.value} is invalid`
        }
    },
    bpm: { type: Number, required: [true, 'Song\'s bpm is required'] },
    artistID: { type: Schema.Types.ObjectId, required: [true, 'Song\'s artistID is required'] },
    dateAdded: { type: Date, default: Date.now }
});

export const Song = mongoose.model('Song', SongSchema, SongCollectionName);