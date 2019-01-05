import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PremiumStableSharedModule } from 'app/shared';
import {
    PersonMySuffixComponent,
    PersonMySuffixDetailComponent,
    PersonMySuffixUpdateComponent,
    PersonMySuffixDeletePopupComponent,
    PersonMySuffixDeleteDialogComponent,
    personRoute,
    personPopupRoute
} from './';

const ENTITY_STATES = [...personRoute, ...personPopupRoute];

@NgModule({
    imports: [PremiumStableSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        PersonMySuffixComponent,
        PersonMySuffixDetailComponent,
        PersonMySuffixUpdateComponent,
        PersonMySuffixDeleteDialogComponent,
        PersonMySuffixDeletePopupComponent
    ],
    entryComponents: [
        PersonMySuffixComponent,
        PersonMySuffixUpdateComponent,
        PersonMySuffixDeleteDialogComponent,
        PersonMySuffixDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PremiumStablePersonMySuffixModule {}
