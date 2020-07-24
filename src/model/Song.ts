import { AEntity } from '../abstract';
import { Artist } from './Artist';

export class Song extends AEntity {

    constructor(
        name: string,
        public artist: Artist,
        public duration: number,
        public genre: string,
        public bpm: number) {

        super(name);
    }
}