import {Playlist, Song} from '../model';

class PlaylistService {

    get() { return Playlist.db; }

    findOne(condition: (playlist: Playlist) => boolean) {
        return Playlist.findOne(condition);
    }

    find(condition: (playlist: Playlist) => boolean,
         paging: { page: number; length: number } | null = null) {
        return Playlist.find(condition, paging);
    }

    insert(playlist: Playlist): boolean {
        return Playlist.insert(playlist);
    }

    insertMany(playlists: Playlist[] | null): boolean {
        let inserted = true;
        playlists?.forEach(playlist => { inserted = inserted && (Playlist.insert(playlist)); });
        return inserted;
    }

    updateOne(condition: (p: Playlist) => boolean, action: (toBeUpdated: Playlist) => void): boolean {
        return Playlist.update(condition, action, true);
    }

    updateMany(condition: (p: Playlist) => boolean, action: (toBeUpdated: Playlist) => void): boolean {
        return Playlist.update(condition, action);
    }

    removeOne(condition: (p: Playlist) => boolean) {
        return Playlist.delete(condition, true);
    }

    removeMany(condition: (p: Playlist) => boolean) {
        return Playlist.delete(condition, false);
    }

    addSong(playlistID: string, songID: string): boolean {

        // if (!Song.exists(song)) return false;

        const song = Song.findOne(s => s.id === songID);
        if (!song) return false;

        Playlist.db.forEach(pl => {
            if (pl.id === playlistID) {
                pl.insertSong(song);
            }
        })

        return true;
    }

    removeSong(playlistID: string, songID: string): boolean {
        Playlist.db.forEach(playlist => {
            if (playlist.id === playlistID) return playlist.removeSong(songID);
        })
        return false;
    }
}

export const playlistService: PlaylistService = new PlaylistService();