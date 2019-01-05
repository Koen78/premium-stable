import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PremiumStableSharedModule } from 'app/shared';
import {
    LevelJumpingHisMySuffixComponent,
    LevelJumpingHisMySuffixDetailComponent,
    LevelJumpingHisMySuffixUpdateComponent,
    LevelJumpingHisMySuffixDeletePopupComponent,
    LevelJumpingHisMySuffixDeleteDialogComponent,
    levelJumpingHisRoute,
    levelJumpingHisPopupRoute
} from './';

const ENTITY_STATES = [...levelJumpingHisRoute, ...levelJumpingHisPopupRoute];

@NgModule({
    imports: [PremiumStableSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        LevelJumpingHisMySuffixComponent,
        LevelJumpingHisMySuffixDetailComponent,
        LevelJumpingHisMySuffixUpdateComponent,
        LevelJumpingHisMySuffixDeleteDialogComponent,
        LevelJumpingHisMySuffixDeletePopupComponent
    ],
    entryComponents: [
        LevelJumpingHisMySuffixComponent,
        LevelJumpingHisMySuffixUpdateComponent,
        LevelJumpingHisMySuffixDeleteDialogComponent,
        LevelJumpingHisMySuffixDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PremiumStableLevelJumpingHisMySuffixModule {}
