import mongoose, {Types, Document, Query} from 'mongoose';

import { Artist, Song } from '../model';
import { artistService } from './artist';

class SongService {

    async get() {
        try {
            const songs = await Song.find();
            return songs;
        } catch (err) {
            return [];
        }
    }

    async findOne(id: string) {
        try {
            const song = await Song.findOne({
                _id: mongoose.Types.ObjectId(id)
            });
            return song;
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