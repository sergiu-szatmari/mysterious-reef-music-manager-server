import { AbstractEntity } from './AbstractEntity';
import { Artist } from './Artist';

export class Song extends AbstractEntity {

    constructor(
        name: string,
        public artist: Artist,
        public duration: number,
        public genre: string,
        public bpm: number) {

        super(name);
    }
}