import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { IMedCheckXrayMySuffix } from 'app/shared/model/med-check-xray-my-suffix.model';

@Component({
    selector: 'jhi-med-check-xray-my-suffix-detail',
    templateUrl: './med-check-xray-my-suffix-detail.component.html'
})
export class MedCheckXrayMySuffixDetailComponent implements OnInit {
    medCheckXray: IMedCheckXrayMySuffix;

    constructor(protected dataUtils: JhiDataUtils, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ medCheckXray }) => {
            this.medCheckXray = medCheckXray;
        });
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }
    previousState() {
        window.history.back();
    }
}
