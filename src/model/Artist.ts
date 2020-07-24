import { AEntity } from '../abstract';

export class Artist extends AEntity {

    constructor(
        name: string,
        public birthDate: Date,
        public originCountry: string = 'Unknown') {

        super(name);
    }
}