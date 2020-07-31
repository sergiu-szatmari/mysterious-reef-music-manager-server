import { Document, Types } from 'mongoose';
import {Library, Playlist} from '../model';

class LibraryService {

    async get() {
        return Library.find();
    }

    async findOne(id: string) {
        return Library.findOne({ _id: Types.ObjectId(id) });
    }

    async insert(name: string, playlistIDs: string[] | null = null): Promise<Document> {
        let playlists: any[] = [];
        if (!!playlistIDs) {
            for (let i = 0; i < playlistIDs.length; i++) {
                let id = Types.ObjectId(playlistIDs[i]);
                let playlist = await Playlist.findOne({ _id: id });
                if (!!playlist) playlists.push(playlist);
            }
        }

        return (new Library({ name: name, playlists: playlists })).save();
    }

    async removeOne(id: string) {
        return Library.deleteOne({ _id: Types.ObjectId(id) });
    }

    async addPlaylist(libraryID: string, playlistID: string) {

        if (!Library.findOne({ _id: libraryID }) ||
            !Playlist.findOne({ _id: playlistID })) return false;

        await Library.updateOne({ _id: libraryID }, { $push: { playlists: new Types.ObjectId(playlistID) }})
        return true;
    }
}

export const libraryService = new LibraryService();