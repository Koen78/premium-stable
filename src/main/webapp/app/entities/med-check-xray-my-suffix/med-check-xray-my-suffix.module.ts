import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PremiumStableSharedModule } from 'app/shared';
import {
    MedCheckXrayMySuffixComponent,
    MedCheckXrayMySuffixDetailComponent,
    MedCheckXrayMySuffixUpdateComponent,
    MedCheckXrayMySuffixDeletePopupComponent,
    MedCheckXrayMySuffixDeleteDialogComponent,
    medCheckXrayRoute,
    medCheckXrayPopupRoute
} from './';

const ENTITY_STATES = [...medCheckXrayRoute, ...medCheckXrayPopupRoute];

@NgModule({
    imports: [PremiumStableSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        MedCheckXrayMySuffixComponent,
        MedCheckXrayMySuffixDetailComponent,
        MedCheckXrayMySuffixUpdateComponent,
        MedCheckXrayMySuffixDeleteDialogComponent,
        MedCheckXrayMySuffixDeletePopupComponent
    ],
    entryComponents: [
        MedCheckXrayMySuffixComponent,
        MedCheckXrayMySuffixUpdateComponent,
        MedCheckXrayMySuffixDeleteDialogComponent,
        MedCheckXrayMySuffixDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PremiumStableMedCheckXrayMySuffixModule {}
