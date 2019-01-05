export interface IColorMySuffix {
    id?: number;
    color?: string;
}

export class ColorMySuffix implements IColorMySuffix {
    constructor(public id?: number, public color?: string) {}
}
