import { IEntity } from '../interface';
import { generateId } from '../util';

abstract class LibraryDb {

    public static db: Library[] = [];

    static exists(entity: Library): boolean { return (this.db.indexOf(entity) !== -1); }

    static get(): Library[] { return this.db; }

    static insert(entity: Library): boolean {
        if (!this.exists(entity)) {
            this.db.push(entity);
            return true;
        }
        return false;
    }

    static update(condition: (s: Library) => boolean, action: (toBeUpdated: Library) => void, updateOne: boolean = false): boolean {
        let updated = false;
        this.db.forEach(library => {
            if (condition(library)) {
                action(library);
                if (updateOne) return;
                updated = true;
            }
        })
        return updated;
    }

    static delete(condition: (s: Library) => boolean, deleteOne: boolean = true): boolean {
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

    static find(condition: (s: Library) => boolean | null, paging: { page: number; length: number } | null = null): Library[] {
        let found: Library[] = [];

        this.db.forEach(library => {
            if (condition(library)) found.push(library);
        })

        if (!!paging) {
            const start = paging.page * paging.length,
                end = start + paging.length;
            found = found.slice(start, end);
        }

        return found;
    }

    static findOne(condition: (s: Library) => boolean): Library | null {
        let found: Library | null = null;
        this.db.forEach(library => {
            if (condition(library)) found = library;
        })

        return found;
    }

}

export class Library  extends LibraryDb implements IEntity {

    constructor(
        public readonly id: string = generateId(),
        public name: string) {

        super();
    }
}