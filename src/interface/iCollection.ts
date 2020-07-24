import { Song } from "../model";

export interface ICollection<T> {

    exists(entity: T): boolean;
    asyncExists(entity: T): Promise<boolean>;

    get(): T[];
    asyncGet(): Promise<T[]>;

    find(condition: (s: Song) => boolean, paging: { page: number, length: number }): T[];

    findOne(condition: (s: Song) => boolean): T | null;

    insert(entity: T): boolean;
    asyncInsert(entity: T): Promise<boolean>;

    update(condition: (s: Song) => boolean, action: (toBeUpdated: Song) => void): boolean;
    asyncUpdate(condition: (s: Song) => boolean, action: (toBeUpdated: Song) => void): Promise<boolean>;

    delete(condition: (s: Song) => boolean): boolean;
    asyncDelete(condition: (s: Song) => boolean):Promise <boolean>;
}