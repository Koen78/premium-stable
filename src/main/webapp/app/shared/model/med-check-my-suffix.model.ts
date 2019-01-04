import { Moment } from 'moment';
import { IMedCheckDetMySuffix } from 'app/shared/model//med-check-det-my-suffix.model';
import { IMedCheckXrayMySuffix } from 'app/shared/model//med-check-xray-my-suffix.model';

export interface IMedCheckMySuffix {
    id?: number;
    date?: Moment;
    shortDescription?: string;
    resultDescription?: string;
    pdfContentType?: string;
    pdf?: any;
    horseId?: number;
    details?: IMedCheckDetMySuffix[];
    xrays?: IMedCheckXrayMySuffix[];
}

export class MedCheckMySuffix implements IMedCheckMySuffix {
    constructor(
        public id?: number,
        public date?: Moment,
        public shortDescription?: string,
        public resultDescription?: string,
        public pdfContentType?: string,
        public pdf?: any,
        public horseId?: number,
        public details?: IMedCheckDetMySuffix[],
        public xrays?: IMedCheckXrayMySuffix[]
    ) {}
}
