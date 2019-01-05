export interface IGenderMySuffix {
    id?: number;
    gender?: string;
}

export class GenderMySuffix implements IGenderMySuffix {
    constructor(public id?: number, public gender?: string) {}
}
