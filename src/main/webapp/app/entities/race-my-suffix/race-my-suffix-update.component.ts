import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { JhiAlertService } from 'ng-jhipster';

import { IRaceMySuffix } from 'app/shared/model/race-my-suffix.model';
import { RaceMySuffixService } from './race-my-suffix.service';
import { ICountryMySuffix } from 'app/shared/model/country-my-suffix.model';
import { CountryMySuffixService } from 'app/entities/country-my-suffix';

@Component({
    selector: 'jhi-race-my-suffix-update',
    templateUrl: './race-my-suffix-update.component.html'
})
export class RaceMySuffixUpdateComponent implements OnInit {
    race: IRaceMySuffix;
    isSaving: boolean;

    countries: ICountryMySuffix[];
    dateDp: any;

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected raceService: RaceMySuffixService,
        protected countryService: CountryMySuffixService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ race }) => {
            this.race = race;
        });
        this.countryService.query().subscribe(
            (res: HttpResponse<ICountryMySuffix[]>) => {
                this.countries = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.race.id !== undefined) {
            this.subscribeToSaveResponse(this.raceService.update(this.race));
        } else {
            this.subscribeToSaveResponse(this.raceService.create(this.race));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IRaceMySuffix>>) {
        result.subscribe((res: HttpResponse<IRaceMySuffix>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackCountryById(index: number, item: ICountryMySuffix) {
        return item.id;
    }
}
