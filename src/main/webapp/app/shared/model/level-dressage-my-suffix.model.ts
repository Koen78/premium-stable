export interface ILevelDressageMySuffix {
    id?: number;
    description?: string;
}

export class LevelDressageMySuffix implements ILevelDressageMySuffix {
    constructor(public id?: number, public description?: string) {}
}
