import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PremiumStableSharedModule } from 'app/shared';
import {
    LanguageParamMySuffixComponent,
    LanguageParamMySuffixDetailComponent,
    LanguageParamMySuffixUpdateComponent,
    LanguageParamMySuffixDeletePopupComponent,
    LanguageParamMySuffixDeleteDialogComponent,
    languageParamRoute,
    languageParamPopupRoute
} from './';

const ENTITY_STATES = [...languageParamRoute, ...languageParamPopupRoute];

@NgModule({
    imports: [PremiumStableSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        LanguageParamMySuffixComponent,
        LanguageParamMySuffixDetailComponent,
        LanguageParamMySuffixUpdateComponent,
        LanguageParamMySuffixDeleteDialogComponent,
        LanguageParamMySuffixDeletePopupComponent
    ],
    entryComponents: [
        LanguageParamMySuffixComponent,
        LanguageParamMySuffixUpdateComponent,
        LanguageParamMySuffixDeleteDialogComponent,
        LanguageParamMySuffixDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PremiumStableLanguageParamMySuffixModule {}
