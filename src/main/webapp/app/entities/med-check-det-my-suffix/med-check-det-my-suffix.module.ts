import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PremiumStableSharedModule } from 'app/shared';
import {
    MedCheckDetMySuffixComponent,
    MedCheckDetMySuffixDetailComponent,
    MedCheckDetMySuffixUpdateComponent,
    MedCheckDetMySuffixDeletePopupComponent,
    MedCheckDetMySuffixDeleteDialogComponent,
    medCheckDetRoute,
    medCheckDetPopupRoute
} from './';

const ENTITY_STATES = [...medCheckDetRoute, ...medCheckDetPopupRoute];

@NgModule({
    imports: [PremiumStableSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        MedCheckDetMySuffixComponent,
        MedCheckDetMySuffixDetailComponent,
        MedCheckDetMySuffixUpdateComponent,
        MedCheckDetMySuffixDeleteDialogComponent,
        MedCheckDetMySuffixDeletePopupComponent
    ],
    entryComponents: [
        MedCheckDetMySuffixComponent,
        MedCheckDetMySuffixUpdateComponent,
        MedCheckDetMySuffixDeleteDialogComponent,
        MedCheckDetMySuffixDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PremiumStableMedCheckDetMySuffixModule {}
