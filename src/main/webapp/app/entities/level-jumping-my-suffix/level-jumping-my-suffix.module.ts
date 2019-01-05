import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PremiumStableSharedModule } from 'app/shared';
import {
    LevelJumpingMySuffixComponent,
    LevelJumpingMySuffixDetailComponent,
    LevelJumpingMySuffixUpdateComponent,
    LevelJumpingMySuffixDeletePopupComponent,
    LevelJumpingMySuffixDeleteDialogComponent,
    levelJumpingRoute,
    levelJumpingPopupRoute
} from './';

const ENTITY_STATES = [...levelJumpingRoute, ...levelJumpingPopupRoute];

@NgModule({
    imports: [PremiumStableSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        LevelJumpingMySuffixComponent,
        LevelJumpingMySuffixDetailComponent,
        LevelJumpingMySuffixUpdateComponent,
        LevelJumpingMySuffixDeleteDialogComponent,
        LevelJumpingMySuffixDeletePopupComponent
    ],
    entryComponents: [
        LevelJumpingMySuffixComponent,
        LevelJumpingMySuffixUpdateComponent,
        LevelJumpingMySuffixDeleteDialogComponent,
        LevelJumpingMySuffixDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PremiumStableLevelJumpingMySuffixModule {}
