import {Document, Types} from 'mongoose';

import { Playlist, Song, SongCollectionName } from '../model';

class PlaylistService {

    async get() {
        return Playlist.find();
    }

    async findOne(id: string) {

        return Playlist.aggregate([
            { $match: { _id: id } },
            { $lookup: { from: SongCollectionName, localField: 'songs', foreignField: '_id', as: 'songs' } },
            { $unwind: { path: '$song', preserveNullAndEmptyArrays: true } }
        ]);
    }

    async insert(name: string, songIDs: string[] | null = null): Promise<Document> {
        let songs: Types.ObjectId[] = [];
        if (!!songIDs) {
            for (let i = 0; i < songIDs.length; i++) {
                let id = Types.ObjectId(songIDs[i]);
                let song = await Song.findOne({ _id: id });
                if (!!song) songs.push( new Types.ObjectId(id) );
            }

        }
        return (new Playlist({ name: name, songs: songs })).save();
    }

    async removeOne(id: string) {
        return Playlist.deleteOne({ _id: Types.ObjectId(id) });
    }

    async addSong(playlistID: string, songID: string): Promise<boolean> {

        if (!Song.findOne({ _id: songID }) ||
            !Playlist.findOne({ _id: playlistID })) return false;

        const newSongID = new Types.ObjectId(songID);
        return Playlist.updateOne({ _id: playlistID }, { $push: { songs: newSongID }});
    }

    async renamePlaylist(id: string, name: string): Promise<Document> {
        return Playlist.updateOne({ _id: Types.ObjectId(id) }, { name: name });
    }
}

export const playlistService: PlaylistService = new PlaylistService();