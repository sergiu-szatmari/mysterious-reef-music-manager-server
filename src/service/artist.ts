import {Artist, Song} from '../model';

class ArtistService {

    get() { return Artist.db; }

    findOne(condition: (a: Artist) => boolean) {
        return Artist.findOne(condition);
    }

    find(condition: (a: Artist) => boolean,
         paging: { page: number; length: number } | null = null) {
        return Artist.find(condition, paging);
    }

    insert(artist: Artist): boolean {
        return Artist.insert(artist);
    }

    insertMany(artists: Artist[] | null): boolean {
        let inserted = true;
        artists?.forEach(artist => { inserted = inserted && (Artist.insert(artist)); });
        return inserted;
    }

    updateOne(condition: (a: Artist) => boolean, action: (toBeUpdated: Artist) => void): boolean {
        return Artist.update(condition, action, true);
    }

    updateMany(condition: (a: Artist) => boolean, action: (toBeUpdated: Artist) => void): boolean {
        return Artist.update(condition, action);
    }

    removeOne(condition: (a: Artist) => boolean) {
        return Artist.delete(condition, true);
    }

    removeMany(condition: (a: Artist) => boolean) {
        return Artist.delete(condition, false);
    }

}

export const artistService = new ArtistService();