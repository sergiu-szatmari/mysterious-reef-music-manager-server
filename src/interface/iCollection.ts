import { Song } from "../model";

export interface ICollection<T> {

    exists(entity: T): boolean;

    get(): T[];

    find(condition: (s: Song) => boolean, paging: { page: number, length: number }): T[];

    findOne(condition: (s: Song) => boolean): T | null;

    insert(entity: T): void;

    update(condition: (s: Song) => boolean, action: (toBeUpdated: Song) => void): boolean

    delete(condition: (s: Song) => boolean): boolean;
}