// import { AbstractEntity } from './AbstractEntity';
import {ICollection, IEntity} from '../interface';
import { Playlist } from './Playlist';
import {generateId} from "../util";

// export class Library extends AbstractEntity implements ICollection<Playlist> {
export class Library implements IEntity { //extends AbstractEntity {

    public readonly id: string;
    private readonly playlists: Playlist[];

    constructor(name: string) {

        // super(name);
        this.id = generateId();
        this.playlists = Array();
    }

}