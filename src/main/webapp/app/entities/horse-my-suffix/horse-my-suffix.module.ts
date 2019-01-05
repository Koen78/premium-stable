import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PremiumStableSharedModule } from 'app/shared';
import {
    HorseMySuffixComponent,
    HorseMySuffixDetailComponent,
    HorseMySuffixUpdateComponent,
    HorseMySuffixDeletePopupComponent,
    HorseMySuffixDeleteDialogComponent,
    horseRoute,
    horsePopupRoute
} from './';

const ENTITY_STATES = [...horseRoute, ...horsePopupRoute];

@NgModule({
    imports: [PremiumStableSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        HorseMySuffixComponent,
        HorseMySuffixDetailComponent,
        HorseMySuffixUpdateComponent,
        HorseMySuffixDeleteDialogComponent,
        HorseMySuffixDeletePopupComponent
    ],
    entryComponents: [
        HorseMySuffixComponent,
        HorseMySuffixUpdateComponent,
        HorseMySuffixDeleteDialogComponent,
        HorseMySuffixDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PremiumStableHorseMySuffixModule {}
