import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PremiumStableSharedModule } from 'app/shared';
import {
    ColorMySuffixComponent,
    ColorMySuffixDetailComponent,
    ColorMySuffixUpdateComponent,
    ColorMySuffixDeletePopupComponent,
    ColorMySuffixDeleteDialogComponent,
    colorRoute,
    colorPopupRoute
} from './';

const ENTITY_STATES = [...colorRoute, ...colorPopupRoute];

@NgModule({
    imports: [PremiumStableSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        ColorMySuffixComponent,
        ColorMySuffixDetailComponent,
        ColorMySuffixUpdateComponent,
        ColorMySuffixDeleteDialogComponent,
        ColorMySuffixDeletePopupComponent
    ],
    entryComponents: [
        ColorMySuffixComponent,
        ColorMySuffixUpdateComponent,
        ColorMySuffixDeleteDialogComponent,
        ColorMySuffixDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PremiumStableColorMySuffixModule {}
