import { AbstractEntity } from './AbstractEntity';

export class Artist extends AbstractEntity {

    constructor(
        name: string,
        public birthDate: Date,
        public originCountry: string = 'Unknown') {

        super(name);
    }
}