import { ICollection } from '../interface';
import { AEntity } from '../abstract';
import { Song } from '.';

export class Playlist extends AEntity implements ICollection<Song> {

    private readonly songs: Song[];

    constructor(name: string) {

        super(name);
        this.songs = Array();
    }

    private timeoutExists(entity: Song, callbackFn: (data: boolean, err: Error | null) => void) {
        setTimeout(() => {
            const res: boolean = this.songs.indexOf(entity) !== -1;
            callbackFn(res, null);
        }, 2000);
    }

    asyncExists(entity: Song): Promise<boolean> {
        return new Promise((onResolve, onReject) => {
            this.timeoutExists(entity, (entity, error) => {
                if (error) onReject(error)
                else onResolve(entity);
            })
        });
    }

    exists(entity: Song): boolean { return (this.songs.indexOf(entity) !== -1); }

    private timeoutGet(callbackFn: (data: Song[], err: Error | null) => void) {
        setTimeout(() => {
            callbackFn(this.songs, null);
        }, 2000);
    };

    asyncGet(): Promise<Song[]> {
        return new Promise((onResolve, onReject) => {
            this.timeoutGet((data, error) => {
                if (error) onReject(error);
                else onResolve(data);
            })
        })
    }

    get(): Song[] { return this.songs; }

    private timeoutInsert(song: Song, callbackFn: (data: boolean, err: Error | null) => void) {
        setTimeout(() => {

            const result: boolean = this.insert(song);
            if (result) callbackFn(result, null);
            else callbackFn(false, new Error('Error on inserting'));
        }, 2000);
    }

    asyncInsert(entity: Song): Promise<boolean> {
        return new Promise((onResolve, onReject) => {
            this.timeoutInsert(entity, (data, error) => {
                if (error) onReject(error);
                else onResolve(data);
            })
        });
    }

    insert(entity: Song): boolean {

        if (!this.exists(entity)) {
            this.songs.push(entity);
            return true;
        }
        return false;
    }

    private timeoutUpdate(
        condition: (s: Song) => boolean,
        action: (toBeUpdated: Song) => void,
        updateOne: boolean = false,
        callbackFn: (data: boolean, err: Error | null) => void) {

        setTimeout(() => {
            const res = this.update(condition, action, updateOne);

            if (res) callbackFn(res, null);
            else callbackFn(res, new Error('Error on updating'));
        }, 2000);
    }

    async asyncUpdate(
        condition: (s: Song) => boolean,
        action: (toBeUpdated: Song) => void,
        updateOne: boolean = false): Promise<boolean> {

        return new Promise((onResolve, onReject) => {
            this.timeoutUpdate(condition, action, updateOne, (data, err) => {
                if (err) onReject(err);
                else onResolve(data);
            })
        })
    }

    update(condition: (s: Song) => boolean, action: (toBeUpdated: Song) => void, updateOne: boolean = false): boolean {

        let updated = false;
        this.songs.forEach(song => {

            if (condition(song)) {

                action(song);
                if (updateOne) return;

                updated = true;
            }
        })

        return updated;
    }

    private timeoutDelete(
        condition: (s: Song) => boolean,
        deleteOne: boolean = true,
        callbackFn: (data: boolean, err: Error | null) => void
    ) {
        setTimeout(() => {
            const res: boolean = this.delete(condition, deleteOne);

            if (res) callbackFn(res, null);
            else callbackFn(res, new Error('Error on removing'));
        }, 2000);
    }

    asyncDelete(condition: (s: Song) => boolean, deleteOne: boolean = true): Promise<boolean> {

        return new Promise((onResolve, onReject) => {
            this.timeoutDelete(
                condition,
                deleteOne,
                (data: boolean, err: Error | null) => {
                    if (err) onReject(err);
                    else onResolve(data);
                })
        })
    }

    delete(condition: (s: Song) => boolean, deleteOne: boolean = true): boolean {

        let removed = false;
        let idx: number[] = [];

        for (let i = 0; i < this.songs.length; i++) {
            if (condition(this.songs[i])) {

                idx.push(i);
                if (deleteOne) break;
            }
        }

        idx.reverse().forEach(i => {
            this.songs.splice(i, 1);
            removed = true;
        });

        return removed;
    }

    find(condition: (s: Song) => boolean | null, paging: { page: number; length: number } | null = null): Song[] {

        let found: Song[] = [];

        this.songs.forEach(song => {
            if (condition(song)) found.push(song);
        })

        if (!!paging) {
            const start = paging.page * paging.length,
                end = start + paging.length;
            found = found.slice(start, end);
        }

        return found;
    }

    findOne(condition: (s: Song) => boolean): Song | null {

        let found: Song | null = null;
        this.songs.forEach(song => {
            if (condition(song)) found = song;
        })

        return found;
    }
}