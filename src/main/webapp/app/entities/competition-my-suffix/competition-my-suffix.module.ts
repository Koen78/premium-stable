import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PremiumStableSharedModule } from 'app/shared';
import {
    CompetitionMySuffixComponent,
    CompetitionMySuffixDetailComponent,
    CompetitionMySuffixUpdateComponent,
    CompetitionMySuffixDeletePopupComponent,
    CompetitionMySuffixDeleteDialogComponent,
    competitionRoute,
    competitionPopupRoute
} from './';

const ENTITY_STATES = [...competitionRoute, ...competitionPopupRoute];

@NgModule({
    imports: [PremiumStableSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        CompetitionMySuffixComponent,
        CompetitionMySuffixDetailComponent,
        CompetitionMySuffixUpdateComponent,
        CompetitionMySuffixDeleteDialogComponent,
        CompetitionMySuffixDeletePopupComponent
    ],
    entryComponents: [
        CompetitionMySuffixComponent,
        CompetitionMySuffixUpdateComponent,
        CompetitionMySuffixDeleteDialogComponent,
        CompetitionMySuffixDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PremiumStableCompetitionMySuffixModule {}
