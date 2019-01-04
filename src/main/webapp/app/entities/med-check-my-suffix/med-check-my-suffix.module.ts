import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PremiumStableSharedModule } from 'app/shared';
import {
    MedCheckMySuffixComponent,
    MedCheckMySuffixDetailComponent,
    MedCheckMySuffixUpdateComponent,
    MedCheckMySuffixDeletePopupComponent,
    MedCheckMySuffixDeleteDialogComponent,
    medCheckRoute,
    medCheckPopupRoute
} from './';

const ENTITY_STATES = [...medCheckRoute, ...medCheckPopupRoute];

@NgModule({
    imports: [PremiumStableSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        MedCheckMySuffixComponent,
        MedCheckMySuffixDetailComponent,
        MedCheckMySuffixUpdateComponent,
        MedCheckMySuffixDeleteDialogComponent,
        MedCheckMySuffixDeletePopupComponent
    ],
    entryComponents: [
        MedCheckMySuffixComponent,
        MedCheckMySuffixUpdateComponent,
        MedCheckMySuffixDeleteDialogComponent,
        MedCheckMySuffixDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PremiumStableMedCheckMySuffixModule {}
