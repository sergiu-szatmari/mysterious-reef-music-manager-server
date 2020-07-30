import { IEntity } from '../interface';
import { generateId } from '../util';

abstract class ArtistDb {

    public static db: Artist[] = [];

    static exists(entity: Artist): boolean { return (this.db.indexOf(entity) !== -1); }

    static get(): Artist[] { return this.db; }

    static insert(entity: Artist): boolean {
        if (!this.exists(entity)) {
            this.db.push(entity);
            return true;
        }
        return false;
    }

    static update(condition: (s: Artist) => boolean, action: (toBeUpdated: Artist) => void, updateOne: boolean = false): boolean {
        let updated = false;
        this.db.forEach(artist => {
            if (condition(artist)) {
                action(artist);
                if (updateOne) return;
                updated = true;
            }
        })
        return updated;
    }

    static delete(condition: (s: Artist) => boolean, deleteOne: boolean = true): boolean {
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

    static find(condition: (s: Artist) => boolean | null, paging: { page: number; length: number } | null = null): Artist[] {
        let found: Artist[] = [];

        this.db.forEach(artist => {
            if (condition(artist)) found.push(artist);
        })

        if (!!paging) {
            const start = paging.page * paging.length,
                end = start + paging.length;
            found = found.slice(start, end);
        }

        return found;
    }

    static findOne(condition: (s: Artist) => boolean): Artist | null {
        let found: Artist | null = null;
        this.db.forEach(artist => {
            if (condition(artist)) found = artist;
        })

        return found;
    }

}

export class Artist extends ArtistDb implements IEntity { //extends AbstractEntity {

    constructor(
        public readonly id: string = generateId(),
        public name: string,
        public birthDate: Date,
        public originCountry: string = 'Unknown') {

        super();
    }
}