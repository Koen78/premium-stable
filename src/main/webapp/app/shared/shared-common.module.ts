import { NgModule } from '@angular/core';

import { PremiumStableSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent } from './';

@NgModule({
    imports: [PremiumStableSharedLibsModule],
    declarations: [JhiAlertComponent, JhiAlertErrorComponent],
    exports: [PremiumStableSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent]
})
export class PremiumStableSharedCommonModule {}
