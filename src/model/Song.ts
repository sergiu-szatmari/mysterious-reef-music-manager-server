// import { AbstractEntity } from './AbstractEntity';
import { Artist } from './Artist';
import { IEntity } from '../interface';
import { generateId } from '../util';

abstract class SongDb {

    public static db: Song[] = [];

    static exists(entity: Song): boolean { return (this.db.indexOf(entity) !== -1); }

    static get(): Song[] { return this.db; }

    static insert(entity: Song): boolean {
        if (!this.exists(entity)) {
            this.db.push(entity);
            return true;
        }
        return false;
    }

    static update(condition: (s: Song) => boolean, action: (toBeUpdated: Song) => void, updateOne: boolean = false): boolean {
        let updated = false;
        this.db.forEach(song => {
            if (condition(song)) {
                action(song);
                if (updateOne) return;
                updated = true;
            }
        })
        return updated;
    }

    static delete(condition: (s: Song) => boolean, deleteOne: boolean = true): boolean {
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

    static find(condition: (s: Song) => boolean | null, paging: { page: number; length: number } | null = null): Song[] {
        let found: Song[] = [];

        this.db.forEach(song => {
            if (condition(song)) found.push(song);
        })

        if (!!paging) {
            const start = paging.page * paging.length,
                end = start + paging.length;
            found = found.slice(start, end);
        }

        return found;
    }

    static findOne(condition: (s: Song) => boolean): Song | null {
        let found: Song | null = null;
        this.db.forEach(song => {
            if (condition(song)) found = song;
        })

        return found;
    }

}

export class Song extends SongDb implements IEntity {

    constructor(
        public readonly id: string = generateId(),
        public name: string,
        public artistID: string,
        // public artist: Artist,
        public duration: number,
        public genre: string,
        public bpm: number) {

        super();
    }
}