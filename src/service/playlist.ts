import {Document, Types} from 'mongoose';

import {Playlist, Song} from '../model';

class PlaylistService {

    async get() {
        return Playlist.find();
    }

    async findOne(id: string) {
        return Playlist.findOne({ _id: Types.ObjectId(id) });
    }

    async insert(name: string, songIDs: string[] | null = null): Promise<Document> {
        let songs: any[] = [];
        if (!!songIDs) {
            for (let i = 0; i < songIDs.length; i++) {
                let id = Types.ObjectId(songIDs[i]);
                let song = await Song.findOne({ _id: id });
                if (!!song) songs.push(song);
            }

        }
        return (new Playlist({ name: name, songs: songs })).save();
    }

    async removeOne(id: string) {
        return Playlist.deleteOne({ _id: Types.ObjectId(id) });
    }

    async addSong(playlistID: string, songID: string): Promise<boolean> {
        return true;
    }

    removeSong(playlistID: string, songID: string): boolean {
        return true;
    }
}

export const playlistService: PlaylistService = new PlaylistService();