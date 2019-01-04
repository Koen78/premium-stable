import { Moment } from 'moment';

export interface ICompetitionMySuffix {
    id?: number;
    date?: Moment;
    description?: string;
    result?: string;
    horseId?: number;
    raceId?: number;
}

export class CompetitionMySuffix implements ICompetitionMySuffix {
    constructor(
        public id?: number,
        public date?: Moment,
        public description?: string,
        public result?: string,
        public horseId?: number,
        public raceId?: number
    ) {}
}
