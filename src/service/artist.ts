import {Document, Types} from 'mongoose';
import { ArtistSchema, Artist } from '../model';

class ArtistService {

    async get() {
        return Artist.find();
    }

    async findOne(id: string) {
        return Artist.findOne({ _id: Types.ObjectId(id) });
    }

    async insert(name: string, birthDate: Date, originCountry: string | undefined): Promise<Document> {
        return (new Artist({ name, birthDate, originCountry })).save();
    }

    async updateOne(id: string, name: string, birthDate: Date, originCountry: string): Promise<Document> {
        return Artist.updateOne(
            { _id: Types.ObjectId(id) },
            { $set: {
                    name: name,
                    birthDate: birthDate,
                    originCountry: originCountry,
                } }
        );
    }

    async removeOne(id: string) {
        return Artist.deleteOne({ _id: Types.ObjectId(id) });
    }
}

export const artistService = new ArtistService();
