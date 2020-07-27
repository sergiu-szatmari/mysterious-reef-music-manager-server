// import { AbstractEntity } from './AbstractEntity';
import { Artist } from './Artist';
import {IEntity} from "../interface";
import {generateId} from "../util";

export class Song implements IEntity {//extends AbstractEntity {

    public readonly id: string;
    constructor(
        name: string,
        public artist: Artist,
        public duration: number,
        public genre: string,
        public bpm: number) {

        // super(name);
        this.id = generateId();
    }
}