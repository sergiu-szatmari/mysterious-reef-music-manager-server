import { generateId } from '../util';

// export class Playlist implements IEntity, ICollection<Song> {//extends AbstractEntity implements ICollection<Song> {
//
//     public readonly id: string;
//     private readonly songs: Song[];
//
//     constructor(public name: string) {
//
//         // super(name);
//         this.id = generateId();
//         this.songs = Array();
//     }
//
//     private timeoutExists(entity: Song, callbackFn: (data: boolean, err: Error | null) => void) {
//         setTimeout(() => {
//             const res: boolean = this.songs.indexOf(entity) !== -1;
//             callbackFn(res, null);
//         }, 2000);
//     }
//
//     asyncExists(entity: Song): Promise<boolean> {
//         return new Promise((onResolve, onReject) => {
//             this.timeoutExists(entity, (entity, error) => {
//                 if (error) onReject(error)
//                 else onResolve(entity);
//             })
//         });
//     }
//
//     exists(entity: Song): boolean { return (this.songs.indexOf(entity) !== -1); }
//
//     private timeoutGet(callbackFn: (data: Song[], err: Error | null) => void) {
//         setTimeout(() => {
//             callbackFn(this.songs, null);
//         }, 2000);
//     };
//
//     asyncGet(): Promise<Song[]> {
//         return new Promise((onResolve, onReject) => {
//             this.timeoutGet((data, error) => {
//                 if (error) onReject(error);
//                 else onResolve(data);
//             })
//         })
//     }
//
//     get(): Song[] { return this.songs; }
//
//     private timeoutInsert(song: Song, callbackFn: (data: boolean, err: Error | null) => void) {
//         setTimeout(() => {
//
//             const result: boolean = this.insert(song);
//             if (result) callbackFn(result, null);
//             else callbackFn(false, new Error('Error on inserting'));
//         }, 2000);
//     }
//
//     asyncInsert(entity: Song): Promise<boolean> {
//         return new Promise((onResolve, onReject) => {
//             this.timeoutInsert(entity, (data, error) => {
//                 if (error) onReject(error);
//                 else onResolve(data);
//             })
//         });
//     }
//
//     insert(entity: Song): boolean {
//
//         if (!this.exists(entity)) {
//             this.songs.push(entity);
//             return true;
//         }
//         return false;
//     }
//
//     private timeoutUpdate(
//         condition: (s: Song) => boolean,
//         action: (toBeUpdated: Song) => void,
//         updateOne: boolean = false,
//         callbackFn: (data: boolean, err: Error | null) => void) {
//
//         setTimeout(() => {
//             const res = this.update(condition, action, updateOne);
//
//             if (res) callbackFn(res, null);
//             else callbackFn(res, new Error('Error on updating'));
//         }, 2000);
//     }
//
//     asyncUpdate(
//         condition: (s: Song) => boolean,
//         action: (toBeUpdated: Song) => void,
//         updateOne: boolean = false): Promise<boolean> {
//
//         return new Promise((onResolve, onReject) => {
//             this.timeoutUpdate(condition, action, updateOne, (data, err) => {
//                 if (err) onReject(err);
//                 else onResolve(data);
//             })
//         })
//     }
//
//     update(condition: (s: Song) => boolean, action: (toBeUpdated: Song) => void, updateOne: boolean = false): boolean {
//
//         let updated = false;
//         this.songs.forEach(song => {
//
//             if (condition(song)) {
//
//                 action(song);
//                 if (updateOne) return;
//
//                 updated = true;
//             }
//         })
//
//         return updated;
//     }
//
//     private timeoutDelete(
//         condition: (s: Song) => boolean,
//         deleteOne: boolean = true,
//         callbackFn: (data: boolean, err: Error | null) => void
//     ) {
//         setTimeout(() => {
//             const res: boolean = this.delete(condition, deleteOne);
//
//             if (res) callbackFn(res, null);
//             else callbackFn(res, new Error('Error on removing'));
//         }, 2000);
//     }
//
//     asyncDelete(condition: (s: Song) => boolean, deleteOne: boolean = true): Promise<boolean> {
//
//         return new Promise((onResolve, onReject) => {
//             this.timeoutDelete(
//                 condition,
//                 deleteOne,
//                 (data: boolean, err: Error | null) => {
//                     if (err) onReject(err);
//                     else onResolve(data);
//                 })
//         })
//     }
//
//     delete(condition: (s: Song) => boolean, deleteOne: boolean = true): boolean {
//
//         let removed = false;
//         let idx: number[] = [];
//
//         for (let i = 0; i < this.songs.length; i++) {
//             if (condition(this.songs[i])) {
//
//                 idx.push(i);
//                 if (deleteOne) break;
//             }
//         }
//
//         idx.reverse().forEach(i => {
//             this.songs.splice(i, 1);
//             removed = true;
//         });
//
//         return removed;
//     }
//
//     find(condition: (s: Song) => boolean | null, paging: { page: number; length: number } | null = null): Song[] {
//
//         let found: Song[] = [];
//
//         this.songs.forEach(song => {
//             if (condition(song)) found.push(song);
//         })
//
//         if (!!paging) {
//             const start = paging.page * paging.length,
//                 end = start + paging.length;
//             found = found.slice(start, end);
//         }
//
//         return found;
//     }
//
//     findOne(condition: (s: Song) => boolean): Song | null {
//
//         let found: Song | null = null;
//         this.songs.forEach(song => {
//             if (condition(song)) found = song;
//         })
//
//         return found;
//     }
//
//
//     // Db simulation
//     public static db: Playlist[] = [];
//     static insert(playlist: Playlist) { this.db.push(playlist); };
//     static update(id: string, newPlaylist: Playlist) { this.db = this.db.map(playlist => {
//         return (playlist.id === id) ? newPlaylist : playlist;
//     })}
//     static delete(id: string) {
//         let pos = -1;
//         this.db.forEach((playlist, idx) => { if (playlist.id === id) pos = idx; });
//
//         if (pos === -1) return;
//         this.db.splice(pos, 1);
//     }
// }

abstract class PlaylistDb {

    public static db: Playlist[] = [];

    static exists(entity: Playlist): boolean { return (this.db.indexOf(entity) !== -1); }

    static get(): Playlist[] { return this.db; }

    static insert(entity: Playlist): boolean {
        if (!this.exists(entity)) {
            this.db.push(entity);
            return true;
        }
        return false;
    }

    static update(condition: (s: Playlist) => boolean, action: (toBeUpdated: Playlist) => void, updateOne: boolean = false): boolean {
        let updated = false;
        this.db.forEach(playlist => {
            if (condition(playlist)) {
                action(playlist);
                if (updateOne) return;
                updated = true;
            }
        })
        return updated;
    }

    static delete(condition: (s: Playlist) => boolean, deleteOne: boolean = true): boolean {
        let removed = false;
        let idx: number[] = [];

        for (let i = 0; i < this.db.length; i++) {
            if (condition(this.db[i])) {
                idx.push(i);
                if (deleteOne) break;
            }
        }

        idx.reverse().forEach(i => {
            this.db.splice(i, 1);
            removed = true;
        });

        return removed;
    }

    static find(condition: (s: Playlist) => boolean | null, paging: { page: number; length: number } | null = null): Playlist[] {
        let found: Playlist[] = [];

        this.db.forEach(playlist => {
            if (condition(playlist)) found.push(playlist);
        })

        if (!!paging) {
            const start = paging.page * paging.length,
                end = start + paging.length;
            found = found.slice(start, end);
        }

        return found;
    }

    static findOne(condition: (s: Playlist) => boolean): Playlist | null {
        let found: Playlist | null = null;
        this.db.forEach(playlist => {
            if (condition(playlist)) found = playlist;
        })

        return found;
    }
}

export class Playlist extends PlaylistDb {

    constructor(
        public readonly id: string = generateId(),
        public name: string) {

        super();
    }
}