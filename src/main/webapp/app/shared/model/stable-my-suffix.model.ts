import { IHorseMySuffix } from 'app/shared/model//horse-my-suffix.model';
import { IPersonMySuffix } from 'app/shared/model//person-my-suffix.model';

export interface IStableMySuffix {
    id?: number;
    description?: string;
    street?: string;
    houseNumber?: string;
    postalcode?: string;
    city?: string;
    horses?: IHorseMySuffix[];
    countryId?: number;
    owners?: IPersonMySuffix[];
}

export class StableMySuffix implements IStableMySuffix {
    constructor(
        public id?: number,
        public description?: string,
        public street?: string,
        public houseNumber?: string,
        public postalcode?: string,
        public city?: string,
        public horses?: IHorseMySuffix[],
        public countryId?: number,
        public owners?: IPersonMySuffix[]
    ) {}
}
