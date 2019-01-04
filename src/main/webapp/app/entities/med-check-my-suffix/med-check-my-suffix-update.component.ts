import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { IMedCheckMySuffix } from 'app/shared/model/med-check-my-suffix.model';
import { MedCheckMySuffixService } from './med-check-my-suffix.service';
import { IHorseMySuffix } from 'app/shared/model/horse-my-suffix.model';
import { HorseMySuffixService } from 'app/entities/horse-my-suffix';

@Component({
    selector: 'jhi-med-check-my-suffix-update',
    templateUrl: './med-check-my-suffix-update.component.html'
})
export class MedCheckMySuffixUpdateComponent implements OnInit {
    medCheck: IMedCheckMySuffix;
    isSaving: boolean;

    horses: IHorseMySuffix[];
    dateDp: any;

    constructor(
        protected dataUtils: JhiDataUtils,
        protected jhiAlertService: JhiAlertService,
        protected medCheckService: MedCheckMySuffixService,
        protected horseService: HorseMySuffixService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ medCheck }) => {
            this.medCheck = medCheck;
        });
        this.horseService.query().subscribe(
            (res: HttpResponse<IHorseMySuffix[]>) => {
                this.horses = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    setFileData(event, entity, field, isImage) {
        this.dataUtils.setFileData(event, entity, field, isImage);
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.medCheck.id !== undefined) {
            this.subscribeToSaveResponse(this.medCheckService.update(this.medCheck));
        } else {
            this.subscribeToSaveResponse(this.medCheckService.create(this.medCheck));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IMedCheckMySuffix>>) {
        result.subscribe((res: HttpResponse<IMedCheckMySuffix>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackHorseById(index: number, item: IHorseMySuffix) {
        return item.id;
    }
}
