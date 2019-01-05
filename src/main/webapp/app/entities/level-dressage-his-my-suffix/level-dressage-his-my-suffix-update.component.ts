import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { JhiAlertService } from 'ng-jhipster';

import { ILevelDressageHisMySuffix } from 'app/shared/model/level-dressage-his-my-suffix.model';
import { LevelDressageHisMySuffixService } from './level-dressage-his-my-suffix.service';
import { IHorseMySuffix } from 'app/shared/model/horse-my-suffix.model';
import { HorseMySuffixService } from 'app/entities/horse-my-suffix';
import { ILevelDressageMySuffix } from 'app/shared/model/level-dressage-my-suffix.model';
import { LevelDressageMySuffixService } from 'app/entities/level-dressage-my-suffix';

@Component({
    selector: 'jhi-level-dressage-his-my-suffix-update',
    templateUrl: './level-dressage-his-my-suffix-update.component.html'
})
export class LevelDressageHisMySuffixUpdateComponent implements OnInit {
    levelDressageHis: ILevelDressageHisMySuffix;
    isSaving: boolean;

    horses: IHorseMySuffix[];

    leveldressages: ILevelDressageMySuffix[];
    dateDp: any;

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected levelDressageHisService: LevelDressageHisMySuffixService,
        protected horseService: HorseMySuffixService,
        protected levelDressageService: LevelDressageMySuffixService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ levelDressageHis }) => {
            this.levelDressageHis = levelDressageHis;
        });
        this.horseService.query().subscribe(
            (res: HttpResponse<IHorseMySuffix[]>) => {
                this.horses = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.levelDressageService.query().subscribe(
            (res: HttpResponse<ILevelDressageMySuffix[]>) => {
                this.leveldressages = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.levelDressageHis.id !== undefined) {
            this.subscribeToSaveResponse(this.levelDressageHisService.update(this.levelDressageHis));
        } else {
            this.subscribeToSaveResponse(this.levelDressageHisService.create(this.levelDressageHis));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<ILevelDressageHisMySuffix>>) {
        result.subscribe(
            (res: HttpResponse<ILevelDressageHisMySuffix>) => this.onSaveSuccess(),
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

    trackHorseById(index: number, item: IHorseMySuffix) {
        return item.id;
    }

    trackLevelDressageById(index: number, item: ILevelDressageMySuffix) {
        return item.id;
    }
}
