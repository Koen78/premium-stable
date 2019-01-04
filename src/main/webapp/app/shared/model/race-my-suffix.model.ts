import { Moment } from 'moment';

export interface IRaceMySuffix {
    id?: number;
    description?: string;
    date?: Moment;
    countryId?: number;
}

export class RaceMySuffix implements IRaceMySuffix {
    constructor(public id?: number, public description?: string, public date?: Moment, public countryId?: number) {}
}
