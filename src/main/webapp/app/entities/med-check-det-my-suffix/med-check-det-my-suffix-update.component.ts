import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IMedCheckDetMySuffix } from 'app/shared/model/med-check-det-my-suffix.model';
import { MedCheckDetMySuffixService } from './med-check-det-my-suffix.service';
import { IMedCheckMySuffix } from 'app/shared/model/med-check-my-suffix.model';
import { MedCheckMySuffixService } from 'app/entities/med-check-my-suffix';

@Component({
    selector: 'jhi-med-check-det-my-suffix-update',
    templateUrl: './med-check-det-my-suffix-update.component.html'
})
export class MedCheckDetMySuffixUpdateComponent implements OnInit {
    medCheckDet: IMedCheckDetMySuffix;
    isSaving: boolean;

    medchecks: IMedCheckMySuffix[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected medCheckDetService: MedCheckDetMySuffixService,
        protected medCheckService: MedCheckMySuffixService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ medCheckDet }) => {
            this.medCheckDet = medCheckDet;
        });
        this.medCheckService.query().subscribe(
            (res: HttpResponse<IMedCheckMySuffix[]>) => {
                this.medchecks = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.medCheckDet.id !== undefined) {
            this.subscribeToSaveResponse(this.medCheckDetService.update(this.medCheckDet));
        } else {
            this.subscribeToSaveResponse(this.medCheckDetService.create(this.medCheckDet));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IMedCheckDetMySuffix>>) {
        result.subscribe((res: HttpResponse<IMedCheckDetMySuffix>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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
