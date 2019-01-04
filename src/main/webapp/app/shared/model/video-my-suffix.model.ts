import { Moment } from 'moment';

export interface IVideoMySuffix {
    id?: number;
    date?: Moment;
    description?: string;
    youTubeUrl?: string;
    horseId?: number;
}

export class VideoMySuffix implements IVideoMySuffix {
    constructor(
        public id?: number,
        public date?: Moment,
        public description?: string,
        public youTubeUrl?: string,
        public horseId?: number
    ) {}
}
