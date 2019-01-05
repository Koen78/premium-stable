import { Moment } from 'moment';

export interface IPictureMySuffix {
    id?: number;
    date?: Moment;
    description?: string;
    imageContentType?: string;
    image?: any;
    horseId?: number;
}

export class PictureMySuffix implements IPictureMySuffix {
    constructor(
        public id?: number,
        public date?: Moment,
        public description?: string,
        public imageContentType?: string,
        public image?: any,
        public horseId?: number
    ) {}
}
