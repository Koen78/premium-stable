import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PremiumStableSharedModule } from 'app/shared';
import {
    VideoMySuffixComponent,
    VideoMySuffixDetailComponent,
    VideoMySuffixUpdateComponent,
    VideoMySuffixDeletePopupComponent,
    VideoMySuffixDeleteDialogComponent,
    videoRoute,
    videoPopupRoute
} from './';

const ENTITY_STATES = [...videoRoute, ...videoPopupRoute];

@NgModule({
    imports: [PremiumStableSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        VideoMySuffixComponent,
        VideoMySuffixDetailComponent,
        VideoMySuffixUpdateComponent,
        VideoMySuffixDeleteDialogComponent,
        VideoMySuffixDeletePopupComponent
    ],
    entryComponents: [
        VideoMySuffixComponent,
        VideoMySuffixUpdateComponent,
        VideoMySuffixDeleteDialogComponent,
        VideoMySuffixDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PremiumStableVideoMySuffixModule {}
