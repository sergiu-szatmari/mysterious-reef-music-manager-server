import mongoose, { Types, Document } from 'mongoose';

import { Song } from '../model';
import { artistService } from './artist';

class SongService {

    async get() {
        try {
            return Song.find();
        } catch (err) {
            return [];
        }
    }

    async findOne(id: string) {
        try {
            return Song.findOne({ _id: Types.ObjectId(id) });
        } catch (err) {
            return null;
        }
    }

    async insert(name: string, artistID: string, duration: number, genre: string, bpm: number): Promise<Document> {
        const artist = await artistService.findOne(artistID);

        if (!artist) throw new Error('No artist with provided ID was found');

        const song: Document = new Song({
            name: name,
            artist: artist,
            duration: duration,
            genre: genre,
            bpm: bpm
        });

        return await song.save();
    }

    async removeOne(id: string) {
        await Song.deleteOne({ _id: Types.ObjectId(id) });
    }
}

export const songService = new SongService();