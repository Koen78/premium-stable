import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { IPictureMySuffix } from 'app/shared/model/picture-my-suffix.model';

@Component({
    selector: 'jhi-picture-my-suffix-detail',
    templateUrl: './picture-my-suffix-detail.component.html'
})
export class PictureMySuffixDetailComponent implements OnInit {
    picture: IPictureMySuffix;

    constructor(protected dataUtils: JhiDataUtils, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ picture }) => {
            this.picture = picture;
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
