export interface IMedCheckDetMySuffix {
    id?: number;
    code?: string;
    result?: string;
    medCheckId?: number;
}

export class MedCheckDetMySuffix implements IMedCheckDetMySuffix {
    constructor(public id?: number, public code?: string, public result?: string, public medCheckId?: number) {}
}
