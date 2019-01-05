import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PremiumStableSharedModule } from 'app/shared';
import {
    GenderMySuffixComponent,
    GenderMySuffixDetailComponent,
    GenderMySuffixUpdateComponent,
    GenderMySuffixDeletePopupComponent,
    GenderMySuffixDeleteDialogComponent,
    genderRoute,
    genderPopupRoute
} from './';

const ENTITY_STATES = [...genderRoute, ...genderPopupRoute];

@NgModule({
    imports: [PremiumStableSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        GenderMySuffixComponent,
        GenderMySuffixDetailComponent,
        GenderMySuffixUpdateComponent,
        GenderMySuffixDeleteDialogComponent,
        GenderMySuffixDeletePopupComponent
    ],
    entryComponents: [
        GenderMySuffixComponent,
        GenderMySuffixUpdateComponent,
        GenderMySuffixDeleteDialogComponent,
        GenderMySuffixDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PremiumStableGenderMySuffixModule {}
