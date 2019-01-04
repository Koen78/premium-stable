import { Moment } from 'moment';

export interface ILevelJumpingHisMySuffix {
    id?: number;
    date?: Moment;
    horseId?: number;
    levelJumpingId?: number;
}

export class LevelJumpingHisMySuffix implements ILevelJumpingHisMySuffix {
    constructor(public id?: number, public date?: Moment, public horseId?: number, public levelJumpingId?: number) {}
}
