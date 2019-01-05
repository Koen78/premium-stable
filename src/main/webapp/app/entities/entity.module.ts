import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { PremiumStablePersonMySuffixModule } from './person-my-suffix/person-my-suffix.module';
import { PremiumStableStableMySuffixModule } from './stable-my-suffix/stable-my-suffix.module';
import { PremiumStableCountryMySuffixModule } from './country-my-suffix/country-my-suffix.module';
import { PremiumStableHorseMySuffixModule } from './horse-my-suffix/horse-my-suffix.module';
import { PremiumStableEquineSpeciesMySuffixModule } from './equine-species-my-suffix/equine-species-my-suffix.module';
import { PremiumStableRaceMySuffixModule } from './race-my-suffix/race-my-suffix.module';
import { PremiumStableLevelDressageMySuffixModule } from './level-dressage-my-suffix/level-dressage-my-suffix.module';
import { PremiumStableLevelJumpingMySuffixModule } from './level-jumping-my-suffix/level-jumping-my-suffix.module';
import { PremiumStableLevelDressageHisMySuffixModule } from './level-dressage-his-my-suffix/level-dressage-his-my-suffix.module';
import { PremiumStableGenderMySuffixModule } from './gender-my-suffix/gender-my-suffix.module';
import { PremiumStableColorMySuffixModule } from './color-my-suffix/color-my-suffix.module';
import { PremiumStableLevelJumpingHisMySuffixModule } from './level-jumping-his-my-suffix/level-jumping-his-my-suffix.module';
import { PremiumStableLanguageParamMySuffixModule } from './language-param-my-suffix/language-param-my-suffix.module';
import { PremiumStablePictureMySuffixModule } from './picture-my-suffix/picture-my-suffix.module';
import { PremiumStableMedCheckMySuffixModule } from './med-check-my-suffix/med-check-my-suffix.module';
import { PremiumStableMedCheckDetMySuffixModule } from './med-check-det-my-suffix/med-check-det-my-suffix.module';
import { PremiumStableMedCheckXrayMySuffixModule } from './med-check-xray-my-suffix/med-check-xray-my-suffix.module';
import { PremiumStableVideoMySuffixModule } from './video-my-suffix/video-my-suffix.module';
import { PremiumStableCompetitionMySuffixModule } from './competition-my-suffix/competition-my-suffix.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    // prettier-ignore
    imports: [
        PremiumStablePersonMySuffixModule,
        PremiumStableStableMySuffixModule,
        PremiumStableCountryMySuffixModule,
        PremiumStableHorseMySuffixModule,
        PremiumStableEquineSpeciesMySuffixModule,
        PremiumStableRaceMySuffixModule,
        PremiumStableLevelDressageMySuffixModule,
        PremiumStableLevelJumpingMySuffixModule,
        PremiumStableLevelDressageHisMySuffixModule,
        PremiumStableGenderMySuffixModule,
        PremiumStableColorMySuffixModule,
        PremiumStableLevelJumpingHisMySuffixModule,
        PremiumStableLanguageParamMySuffixModule,
        PremiumStablePictureMySuffixModule,
        PremiumStableMedCheckMySuffixModule,
        PremiumStableMedCheckDetMySuffixModule,
        PremiumStableMedCheckXrayMySuffixModule,
        PremiumStableVideoMySuffixModule,
        PremiumStableCompetitionMySuffixModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PremiumStableEntityModule {}
