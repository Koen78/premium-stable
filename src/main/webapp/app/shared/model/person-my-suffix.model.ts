import { IStableMySuffix } from 'app/shared/model//stable-my-suffix.model';
import { IHorseMySuffix } from 'app/shared/model//horse-my-suffix.model';

export interface IPersonMySuffix {
    id?: number;
    name?: string;
    mobile?: string;
    email?: string;
    languageParamId?: number;
    stables?: IStableMySuffix[];
    horses?: IHorseMySuffix[];
}

export class PersonMySuffix implements IPersonMySuffix {
    constructor(
        public id?: number,
        public name?: string,
        public mobile?: string,
        public email?: string,
        public languageParamId?: number,
        public stables?: IStableMySuffix[],
        public horses?: IHorseMySuffix[]
    ) {}
}
