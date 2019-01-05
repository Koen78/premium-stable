import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { JhiAlertService } from 'ng-jhipster';

import { ICompetitionMySuffix } from 'app/shared/model/competition-my-suffix.model';
import { CompetitionMySuffixService } from './competition-my-suffix.service';
import { IHorseMySuffix } from 'app/shared/model/horse-my-suffix.model';
import { HorseMySuffixService } from 'app/entities/horse-my-suffix';
import { IRaceMySuffix } from 'app/shared/model/race-my-suffix.model';
import { RaceMySuffixService } from 'app/entities/race-my-suffix';

@Component({
    selector: 'jhi-competition-my-suffix-update',
    templateUrl: './competition-my-suffix-update.component.html'
})
export class CompetitionMySuffixUpdateComponent implements OnInit {
    competition: ICompetitionMySuffix;
    isSaving: boolean;

    horses: IHorseMySuffix[];

    races: IRaceMySuffix[];
    dateDp: any;

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected competitionService: CompetitionMySuffixService,
        protected horseService: HorseMySuffixService,
        protected raceService: RaceMySuffixService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ competition }) => {
            this.competition = competition;
        });
        this.horseService.query().subscribe(
            (res: HttpResponse<IHorseMySuffix[]>) => {
                this.horses = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.raceService.query().subscribe(
            (res: HttpResponse<IRaceMySuffix[]>) => {
                this.races = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.competition.id !== undefined) {
            this.subscribeToSaveResponse(this.competitionService.update(this.competition));
        } else {
            this.subscribeToSaveResponse(this.competitionService.create(this.competition));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<ICompetitionMySuffix>>) {
        result.subscribe((res: HttpResponse<ICompetitionMySuffix>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackRaceById(index: number, item: IRaceMySuffix) {
        return item.id;
    }
}
