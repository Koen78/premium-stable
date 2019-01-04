import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PremiumStableSharedModule } from 'app/shared';
import {
    StableMySuffixComponent,
    StableMySuffixDetailComponent,
    StableMySuffixUpdateComponent,
    StableMySuffixDeletePopupComponent,
    StableMySuffixDeleteDialogComponent,
    stableRoute,
    stablePopupRoute
} from './';

const ENTITY_STATES = [...stableRoute, ...stablePopupRoute];

@NgModule({
    imports: [PremiumStableSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        StableMySuffixComponent,
        StableMySuffixDetailComponent,
        StableMySuffixUpdateComponent,
        StableMySuffixDeleteDialogComponent,
        StableMySuffixDeletePopupComponent
    ],
    entryComponents: [
        StableMySuffixComponent,
        StableMySuffixUpdateComponent,
        StableMySuffixDeleteDialogComponent,
        StableMySuffixDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PremiumStableStableMySuffixModule {}
