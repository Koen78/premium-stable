export interface IMedCheckXrayMySuffix {
    id?: number;
    description?: string;
    imageContentType?: string;
    image?: any;
    medCheckId?: number;
}

export class MedCheckXrayMySuffix implements IMedCheckXrayMySuffix {
    constructor(
        public id?: number,
        public description?: string,
        public imageContentType?: string,
        public image?: any,
        public medCheckId?: number
    ) {}
}
