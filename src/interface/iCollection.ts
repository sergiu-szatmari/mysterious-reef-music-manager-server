export interface ICollection<T> {

    find(condition: (s: T) => boolean, paging: { page: number, length: number }): T[];
    findOne(condition: (s: T) => boolean): T | null;

    get(): T[];
    exists(entity: T): boolean;
    insert(entity: T): boolean;
    update(condition: (s: T) => boolean, action: (toBeUpdated: T) => void): boolean;
    delete(condition: (s: T) => boolean): boolean;

    // asyncGet(): Promise<T[]>;
    // asyncExists(entity: T): Promise<boolean>;
    // asyncInsert(entity: T): Promise<boolean>;
    // asyncUpdate(condition: (s: T) => boolean, action: (toBeUpdated: T) => void): Promise<boolean>;
    // asyncDelete(condition: (s: T) => boolean):Promise <boolean>;
}