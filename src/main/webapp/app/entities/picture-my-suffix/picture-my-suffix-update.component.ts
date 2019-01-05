import { Component, OnInit, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { IPictureMySuffix } from 'app/shared/model/picture-my-suffix.model';
import { PictureMySuffixService } from './picture-my-suffix.service';
import { IHorseMySuffix } from 'app/shared/model/horse-my-suffix.model';
import { HorseMySuffixService } from 'app/entities/horse-my-suffix';

@Component({
    selector: 'jhi-picture-my-suffix-update',
    templateUrl: './picture-my-suffix-update.component.html'
})
export class PictureMySuffixUpdateComponent implements OnInit {
    picture: IPictureMySuffix;
    isSaving: boolean;

    horses: IHorseMySuffix[];
    dateDp: any;

    constructor(
        protected dataUtils: JhiDataUtils,
        protected jhiAlertService: JhiAlertService,
        protected pictureService: PictureMySuffixService,
        protected horseService: HorseMySuffixService,
        protected elementRef: ElementRef,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ picture }) => {
            this.picture = picture;
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

    clearInputImage(field: string, fieldContentType: string, idInput: string) {
        this.dataUtils.clearInputImage(this.picture, this.elementRef, field, fieldContentType, idInput);
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.picture.id !== undefined) {
            this.subscribeToSaveResponse(this.pictureService.update(this.picture));
        } else {
            this.subscribeToSaveResponse(this.pictureService.create(this.picture));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IPictureMySuffix>>) {
        result.subscribe((res: HttpResponse<IPictureMySuffix>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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
