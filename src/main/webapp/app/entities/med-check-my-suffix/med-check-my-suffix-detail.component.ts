import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { IMedCheckMySuffix } from 'app/shared/model/med-check-my-suffix.model';

@Component({
    selector: 'jhi-med-check-my-suffix-detail',
    templateUrl: './med-check-my-suffix-detail.component.html'
})
export class MedCheckMySuffixDetailComponent implements OnInit {
    medCheck: IMedCheckMySuffix;

    constructor(protected dataUtils: JhiDataUtils, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ medCheck }) => {
            this.medCheck = medCheck;
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
