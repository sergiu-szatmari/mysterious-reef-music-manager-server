import {Library, Playlist} from '../model';

class LibraryService {

    get() { return Library.db; }

    findOne(condition: (l: Library) => boolean) {
        return Library.findOne(condition);
    }

    find(condition: (l: Library) => boolean,
         paging: { page: number; length: number } | null = null) {
        return Library.find(condition, paging);
    }

    insert(library: Library): boolean {
        return Library.insert(library);
    }

    insertMany(libraries: Library[] | null): boolean {
        let inserted = true;
        libraries?.forEach(library => { inserted = inserted && (Library.insert(library)); });
        return inserted;
    }

    updateOne(condition: (l: Library) => boolean, action: (toBeUpdated: Library) => void): boolean {
        return Library.update(condition, action, true);
    }

    updateMany(condition: (l: Library) => boolean, action: (toBeUpdated: Library) => void): boolean {
        return Library.update(condition, action);
    }

    removeOne(condition: (l: Library) => boolean) {
        return Library.delete(condition, true);
    }

    removeMany(condition: (l: Library) => boolean) {
        return Library.delete(condition, false);
    }

    addPlaylist(libraryID: string, playlistID: string): boolean {

        const playlist = Playlist.findOne(pl => pl.id === playlistID);
        if (!playlist) return false;

        Library.db.forEach(lib => {
            if (lib.id === libraryID) {
                lib.insertPlaylist(playlist);
            }
        })

        return true;
    }

    removePlaylist(libraryID: string, playlistID: string): boolean {
        Library.db.forEach(lib => {
            if (lib.id === libraryID) return lib.removePlaylist(playlistID);
        })
        return false;
    }
}

export const libraryService = new LibraryService();