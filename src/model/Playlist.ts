import { generateId } from '../util';
import {Song} from "./Song";

/*
// private timeoutExists(entity: Song, callbackFn: (data: boolean, err: Error | null) => void) {
//     setTimeout(() => {
//         const res: boolean = this.songs.indexOf(entity) !== -1;
//         callbackFn(res, null);
//     }, 2000);
// }
//
// asyncExists(entity: Song): Promise<boolean> {
//     return new Promise((onResolve, onReject) => {
//         this.timeoutExists(entity, (entity, error) => {
//             if (error) onReject(error)
//             else onResolve(entity);
//         })
//     });
// }
//
// private timeoutGet(callbackFn: (data: Song[], err: Error | null) => void) {
//     setTimeout(() => {
//         callbackFn(this.songs, null);
//     }, 2000);
// };
//
// asyncGet(): Promise<Song[]> {
//     return new Promise((onResolve, onReject) => {
//         this.timeoutGet((data, error) => {
//             if (error) onReject(error);
//             else onResolve(data);
//         })
//     })
// }
//
// private timeoutInsert(song: Song, callbackFn: (data: boolean, err: Error | null) => void) {
//     setTimeout(() => {
//
//         const result: boolean = this.insert(song);
//         if (result) callbackFn(result, null);
//         else callbackFn(false, new Error('Error on inserting'));
//     }, 2000);
// }
//
// asyncInsert(entity: Song): Promise<boolean> {
//     return new Promise((onResolve, onReject) => {
//         this.timeoutInsert(entity, (data, error) => {
//             if (error) onReject(error);
//             else onResolve(data);
//         })
//     });
// }
//
// private timeoutUpdate(
//     condition: (s: Song) => boolean,
//     action: (toBeUpdated: Song) => void,
//     updateOne: boolean = false,
//     callbackFn: (data: boolean, err: Error | null) => void) {
//
//     setTimeout(() => {
//         const res = this.update(condition, action, updateOne);
//
//         if (res) callbackFn(res, null);
//         else callbackFn(res, new Error('Error on updating'));
//     }, 2000);
// }
//
// asyncUpdate(
//     condition: (s: Song) => boolean,
//     action: (toBeUpdated: Song) => void,
//     updateOne: boolean = false): Promise<boolean> {
//
//     return new Promise((onResolve, onReject) => {
//         this.timeoutUpdate(condition, action, updateOne, (data, err) => {
//             if (err) onReject(err);
//             else onResolve(data);
//         })
//     })
// }
//
// private timeoutDelete(
//     condition: (s: Song) => boolean,
//     deleteOne: boolean = true,
//     callbackFn: (data: boolean, err: Error | null) => void
// ) {
//     setTimeout(() => {
//         const res: boolean = this.delete(condition, deleteOne);
//
//         if (res) callbackFn(res, null);
//         else callbackFn(res, new Error('Error on removing'));
//     }, 2000);
// }
//
// asyncDelete(condition: (s: Song) => boolean, deleteOne: boolean = true): Promise<boolean> {
//
//     return new Promise((onResolve, onReject) => {
//         this.timeoutDelete(
//             condition,
//             deleteOne,
//             (data: boolean, err: Error | null) => {
//                 if (err) onReject(err);
//                 else onResolve(data);
//             })
//     })
// }
*/

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

    public readonly songs: Song[];

    constructor(
        public readonly id: string = generateId(),
        public name: string) {

        super();
        this.songs = Array();
    }

    songExists(song: Song): boolean {
        return this.songs.indexOf(song) !== -1;
    }

    insertSong(song: Song): boolean {
        if (this.songExists(song)) return false

        this.songs.push(song);
        return true;
    }

    removeSong(songID: string): boolean {
        const idx: number = this.songs.findIndex(s => s.id === songID);
        if (idx < 0) return false;

        this.songs.splice(idx, 1);
        return true;
    }
}