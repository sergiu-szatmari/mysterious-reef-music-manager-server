import { Artist, Song } from '../model';

class SongService {

    get() { return Song.db; }

    findOne(condition: (s: Song) => boolean) {
        return Song.findOne(condition);
    }

    find(condition: (s: Song) => boolean,
         paging: { page: number; length: number } | null = null) {
        return Song.find(condition, paging);
    }

    insert(song: Song): boolean {
        // const artist: Artist = song.artist;
        // const artistID: string = song.artistID;

        // Inserts artist too, if doesn't exists
        // if (!Artist.findOne(a => a.id === artistID)) {
        //     Artist.insert(artist);
        // }

        return Song.insert(song);
    }

    insertMany(songs: Song[] | null): boolean {
        let inserted = true;
        songs?.forEach(song => { inserted = inserted && (Song.insert(song)); });
        return inserted;
    }

    updateOne(condition: (s: Song) => boolean,
              action: (toBeUpdated: Song) => void): boolean {
        return Song.update(condition, action, true);
    }

    updateMany(condition: (s: Song) => boolean,
               action: (toBeUpdated: Song) => void): boolean {
        return Song.update(condition, action);
    }

    removeOne(condition: (s: Song) => boolean) {
        return Song.delete(condition, true);
    }

    removeMany(condition: (s: Song) => boolean) {
        return Song.delete(condition, false);
    }
}

export const songService = new SongService();