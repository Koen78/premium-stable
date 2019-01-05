export interface ICountryMySuffix {
    id?: number;
    description?: string;
}

export class CountryMySuffix implements ICountryMySuffix {
    constructor(public id?: number, public description?: string) {}
}
