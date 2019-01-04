export interface ILanguageParamMySuffix {
    id?: number;
    description?: string;
}

export class LanguageParamMySuffix implements ILanguageParamMySuffix {
    constructor(public id?: number, public description?: string) {}
}
