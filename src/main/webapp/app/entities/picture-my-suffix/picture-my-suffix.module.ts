import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PremiumStableSharedModule } from 'app/shared';
import {
    PictureMySuffixComponent,
    PictureMySuffixDetailComponent,
    PictureMySuffixUpdateComponent,
    PictureMySuffixDeletePopupComponent,
    PictureMySuffixDeleteDialogComponent,
    pictureRoute,
    picturePopupRoute
} from './';

const ENTITY_STATES = [...pictureRoute, ...picturePopupRoute];

@NgModule({
    imports: [PremiumStableSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        PictureMySuffixComponent,
        PictureMySuffixDetailComponent,
        PictureMySuffixUpdateComponent,
        PictureMySuffixDeleteDialogComponent,
        PictureMySuffixDeletePopupComponent
    ],
    entryComponents: [
        PictureMySuffixComponent,
        PictureMySuffixUpdateComponent,
        PictureMySuffixDeleteDialogComponent,
        PictureMySuffixDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PremiumStablePictureMySuffixModule {}
