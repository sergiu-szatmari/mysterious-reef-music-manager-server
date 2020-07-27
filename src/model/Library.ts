import { AbstractEntity } from './AbstractEntity';
import { ICollection } from '../interface';
import { Playlist } from './Playlist';

// export class Library extends AbstractEntity implements ICollection<Playlist> {
export class Library extends AbstractEntity {

    private readonly playlists: Playlist[];

    constructor(name: string) {

        super(name);
        this.playlists = Array();
    }

}