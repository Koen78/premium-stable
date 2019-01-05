import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PremiumStableSharedModule } from 'app/shared';
import {
    RaceMySuffixComponent,
    RaceMySuffixDetailComponent,
    RaceMySuffixUpdateComponent,
    RaceMySuffixDeletePopupComponent,
    RaceMySuffixDeleteDialogComponent,
    raceRoute,
    racePopupRoute
} from './';

const ENTITY_STATES = [...raceRoute, ...racePopupRoute];

@NgModule({
    imports: [PremiumStableSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        RaceMySuffixComponent,
        RaceMySuffixDetailComponent,
        RaceMySuffixUpdateComponent,
        RaceMySuffixDeleteDialogComponent,
        RaceMySuffixDeletePopupComponent
    ],
    entryComponents: [
        RaceMySuffixComponent,
        RaceMySuffixUpdateComponent,
        RaceMySuffixDeleteDialogComponent,
        RaceMySuffixDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PremiumStableRaceMySuffixModule {}
