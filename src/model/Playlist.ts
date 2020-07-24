import { ICollection } from '../interface';
import { AEntity } from '../abstract';
import { Song } from '.';

export class Playlist extends AEntity implements ICollection<Song> {

    private readonly songs: Song[];

    constructor(name: string) {

        super(name);
        this.songs = Array();
    }

    exists(entity: Song): boolean { return (this.songs.indexOf(entity) !== -1); }

    get(): Song[] { return this.songs; }

    insert(entity: Song): boolean {

        if (!this.exists(entity)) {
            this.songs.push(entity);
            return true;
        }
        return false;
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