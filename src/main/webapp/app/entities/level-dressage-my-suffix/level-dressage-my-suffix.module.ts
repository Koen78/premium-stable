import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PremiumStableSharedModule } from 'app/shared';
import {
    LevelDressageMySuffixComponent,
    LevelDressageMySuffixDetailComponent,
    LevelDressageMySuffixUpdateComponent,
    LevelDressageMySuffixDeletePopupComponent,
    LevelDressageMySuffixDeleteDialogComponent,
    levelDressageRoute,
    levelDressagePopupRoute
} from './';

const ENTITY_STATES = [...levelDressageRoute, ...levelDressagePopupRoute];

@NgModule({
    imports: [PremiumStableSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        LevelDressageMySuffixComponent,
        LevelDressageMySuffixDetailComponent,
        LevelDressageMySuffixUpdateComponent,
        LevelDressageMySuffixDeleteDialogComponent,
        LevelDressageMySuffixDeletePopupComponent
    ],
    entryComponents: [
        LevelDressageMySuffixComponent,
        LevelDressageMySuffixUpdateComponent,
        LevelDressageMySuffixDeleteDialogComponent,
        LevelDressageMySuffixDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PremiumStableLevelDressageMySuffixModule {}
