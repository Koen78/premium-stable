export interface ILevelJumpingMySuffix {
    id?: number;
    description?: string;
}

export class LevelJumpingMySuffix implements ILevelJumpingMySuffix {
    constructor(public id?: number, public description?: string) {}
}
