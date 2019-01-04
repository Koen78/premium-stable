import { Moment } from 'moment';
import { IPictureMySuffix } from 'app/shared/model//picture-my-suffix.model';
import { IVideoMySuffix } from 'app/shared/model//video-my-suffix.model';
import { ICompetitionMySuffix } from 'app/shared/model//competition-my-suffix.model';
import { IMedCheckMySuffix } from 'app/shared/model//med-check-my-suffix.model';
import { ILevelJumpingHisMySuffix } from 'app/shared/model//level-jumping-his-my-suffix.model';
import { ILevelDressageHisMySuffix } from 'app/shared/model//level-dressage-his-my-suffix.model';
import { IPersonMySuffix } from 'app/shared/model//person-my-suffix.model';

export interface IHorseMySuffix {
    id?: number;
    name?: string;
    birthday?: Moment;
    descentFather?: string;
    descentMother?: string;
    height?: string;
    comment?: string;
    stableId?: number;
    pictures?: IPictureMySuffix[];
    videos?: IVideoMySuffix[];
    competitions?: ICompetitionMySuffix[];
    medChecks?: IMedCheckMySuffix[];
    levelJumpingHisses?: ILevelJumpingHisMySuffix[];
    levelDressageHisses?: ILevelDressageHisMySuffix[];
    levelDressageId?: number;
    levelJumpingId?: number;
    genderId?: number;
    colorId?: number;
    owners?: IPersonMySuffix[];
}

export class HorseMySuffix implements IHorseMySuffix {
    constructor(
        public id?: number,
        public name?: string,
        public birthday?: Moment,
        public descentFather?: string,
        public descentMother?: string,
        public height?: string,
        public comment?: string,
        public stableId?: number,
        public pictures?: IPictureMySuffix[],
        public videos?: IVideoMySuffix[],
        public competitions?: ICompetitionMySuffix[],
        public medChecks?: IMedCheckMySuffix[],
        public levelJumpingHisses?: ILevelJumpingHisMySuffix[],
        public levelDressageHisses?: ILevelDressageHisMySuffix[],
        public levelDressageId?: number,
        public levelJumpingId?: number,
        public genderId?: number,
        public colorId?: number,
        public owners?: IPersonMySuffix[]
    ) {}
}
