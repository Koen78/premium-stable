import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { JhiAlertService } from 'ng-jhipster';

import { ILevelJumpingHisMySuffix } from 'app/shared/model/level-jumping-his-my-suffix.model';
import { LevelJumpingHisMySuffixService } from './level-jumping-his-my-suffix.service';
import { IHorseMySuffix } from 'app/shared/model/horse-my-suffix.model';
import { HorseMySuffixService } from 'app/entities/horse-my-suffix';
import { ILevelJumpingMySuffix } from 'app/shared/model/level-jumping-my-suffix.model';
import { LevelJumpingMySuffixService } from 'app/entities/level-jumping-my-suffix';

@Component({
    selector: 'jhi-level-jumping-his-my-suffix-update',
    templateUrl: './level-jumping-his-my-suffix-update.component.html'
})
export class LevelJumpingHisMySuffixUpdateComponent implements OnInit {
    levelJumpingHis: ILevelJumpingHisMySuffix;
    isSaving: boolean;

    horses: IHorseMySuffix[];

    leveljumpings: ILevelJumpingMySuffix[];
    dateDp: any;

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected levelJumpingHisService: LevelJumpingHisMySuffixService,
        protected horseService: HorseMySuffixService,
        protected levelJumpingService: LevelJumpingMySuffixService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ levelJumpingHis }) => {
            this.levelJumpingHis = levelJumpingHis;
        });
        this.horseService.query().subscribe(
            (res: HttpResponse<IHorseMySuffix[]>) => {
                this.horses = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.levelJumpingService.query().subscribe(
            (res: HttpResponse<ILevelJumpingMySuffix[]>) => {
                this.leveljumpings = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.levelJumpingHis.id !== undefined) {
            this.subscribeToSaveResponse(this.levelJumpingHisService.update(this.levelJumpingHis));
        } else {
            this.subscribeToSaveResponse(this.levelJumpingHisService.create(this.levelJumpingHis));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<ILevelJumpingHisMySuffix>>) {
        result.subscribe(
            (res: HttpResponse<ILevelJumpingHisMySuffix>) => this.onSaveSuccess(),
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

    trackLevelJumpingById(index: number, item: ILevelJumpingMySuffix) {
        return item.id;
    }
}
