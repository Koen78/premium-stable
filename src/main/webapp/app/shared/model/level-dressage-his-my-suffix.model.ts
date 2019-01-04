import { Moment } from 'moment';

export interface ILevelDressageHisMySuffix {
    id?: number;
    date?: Moment;
    horseId?: number;
    levelDressageId?: number;
}

export class LevelDressageHisMySuffix implements ILevelDressageHisMySuffix {
    constructor(public id?: number, public date?: Moment, public horseId?: number, public levelDressageId?: number) {}
}
