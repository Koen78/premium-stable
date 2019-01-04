export interface IEquineSpeciesMySuffix {
    id?: number;
    description?: string;
}

export class EquineSpeciesMySuffix implements IEquineSpeciesMySuffix {
    constructor(public id?: number, public description?: string) {}
}
