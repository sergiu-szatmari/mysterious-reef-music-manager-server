import { IEntity } from '../interface';
import { generateId } from '../util';

export abstract class AEntity implements IEntity {

    public readonly id: string;

    protected constructor(public name: string) { this.id = generateId(); }
}