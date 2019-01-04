import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PremiumStableSharedModule } from 'app/shared';
import {
    LevelDressageHisMySuffixComponent,
    LevelDressageHisMySuffixDetailComponent,
    LevelDressageHisMySuffixUpdateComponent,
    LevelDressageHisMySuffixDeletePopupComponent,
    LevelDressageHisMySuffixDeleteDialogComponent,
    levelDressageHisRoute,
    levelDressageHisPopupRoute
} from './';

const ENTITY_STATES = [...levelDressageHisRoute, ...levelDressageHisPopupRoute];

@NgModule({
    imports: [PremiumStableSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        LevelDressageHisMySuffixComponent,
        LevelDressageHisMySuffixDetailComponent,
        LevelDressageHisMySuffixUpdateComponent,
        LevelDressageHisMySuffixDeleteDialogComponent,
        LevelDressageHisMySuffixDeletePopupComponent
    ],
    entryComponents: [
        LevelDressageHisMySuffixComponent,
        LevelDressageHisMySuffixUpdateComponent,
        LevelDressageHisMySuffixDeleteDialogComponent,
        LevelDressageHisMySuffixDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PremiumStableLevelDressageHisMySuffixModule {}
