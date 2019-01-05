import { Component, OnInit, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { IMedCheckXrayMySuffix } from 'app/shared/model/med-check-xray-my-suffix.model';
import { MedCheckXrayMySuffixService } from './med-check-xray-my-suffix.service';
import { IMedCheckMySuffix } from 'app/shared/model/med-check-my-suffix.model';
import { MedCheckMySuffixService } from 'app/entities/med-check-my-suffix';

@Component({
    selector: 'jhi-med-check-xray-my-suffix-update',
    templateUrl: './med-check-xray-my-suffix-update.component.html'
})
export class MedCheckXrayMySuffixUpdateComponent implements OnInit {
    medCheckXray: IMedCheckXrayMySuffix;
    isSaving: boolean;

    medchecks: IMedCheckMySuffix[];

    constructor(
        protected dataUtils: JhiDataUtils,
        protected jhiAlertService: JhiAlertService,
        protected medCheckXrayService: MedCheckXrayMySuffixService,
        protected medCheckService: MedCheckMySuffixService,
        protected elementRef: ElementRef,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ medCheckXray }) => {
            this.medCheckXray = medCheckXray;
        });
        this.medCheckService.query().subscribe(
            (res: HttpResponse<IMedCheckMySuffix[]>) => {
                this.medchecks = res.body;
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

    clearInputImage(field: string, fieldContentType: string, idInput: string) {
        this.dataUtils.clearInputImage(this.medCheckXray, this.elementRef, field, fieldContentType, idInput);
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.medCheckXray.id !== undefined) {
            this.subscribeToSaveResponse(this.medCheckXrayService.update(this.medCheckXray));
        } else {
            this.subscribeToSaveResponse(this.medCheckXrayService.create(this.medCheckXray));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IMedCheckXrayMySuffix>>) {
        result.subscribe(
            (res: HttpResponse<IMedCheckXrayMySuffix>) => this.onSaveSuccess(),
            (res: HttpErrorResponse) => this.onSaveError()
        );
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

    trackMedCheckById(index: number, item: IMedCheckMySuffix) {
        return item.id;
    }
}
