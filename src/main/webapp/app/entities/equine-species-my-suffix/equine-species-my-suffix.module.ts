import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PremiumStableSharedModule } from 'app/shared';
import {
    EquineSpeciesMySuffixComponent,
    EquineSpeciesMySuffixDetailComponent,
    EquineSpeciesMySuffixUpdateComponent,
    EquineSpeciesMySuffixDeletePopupComponent,
    EquineSpeciesMySuffixDeleteDialogComponent,
    equineSpeciesRoute,
    equineSpeciesPopupRoute
} from './';

const ENTITY_STATES = [...equineSpeciesRoute, ...equineSpeciesPopupRoute];

@NgModule({
    imports: [PremiumStableSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        EquineSpeciesMySuffixComponent,
        EquineSpeciesMySuffixDetailComponent,
        EquineSpeciesMySuffixUpdateComponent,
        EquineSpeciesMySuffixDeleteDialogComponent,
        EquineSpeciesMySuffixDeletePopupComponent
    ],
    entryComponents: [
        EquineSpeciesMySuffixComponent,
        EquineSpeciesMySuffixUpdateComponent,
        EquineSpeciesMySuffixDeleteDialogComponent,
        EquineSpeciesMySuffixDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PremiumStableEquineSpeciesMySuffixModule {}
