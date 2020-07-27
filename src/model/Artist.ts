// import { AbstractEntity } from './AbstractEntity';
import {IEntity} from "../interface";
import {generateId} from "../util";

export class Artist implements IEntity { //extends AbstractEntity {

    public readonly id: string;

    constructor(
        name: string,
        public birthDate: Date,
        public originCountry: string = 'Unknown') {

        this.id = generateId();
    }
}