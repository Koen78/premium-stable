import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IStableMySuffix } from 'app/shared/model/stable-my-suffix.model';
import { StableMySuffixService } from './stable-my-suffix.service';
import { ICountryMySuffix } from 'app/shared/model/country-my-suffix.model';
import { CountryMySuffixService } from 'app/entities/country-my-suffix';
import { IPersonMySuffix } from 'app/shared/model/person-my-suffix.model';
import { PersonMySuffixService } from 'app/entities/person-my-suffix';

@Component({
    selector: 'jhi-stable-my-suffix-update',
    templateUrl: './stable-my-suffix-update.component.html'
})
export class StableMySuffixUpdateComponent implements OnInit {
    stable: IStableMySuffix;
    isSaving: boolean;

    countries: ICountryMySuffix[];

    people: IPersonMySuffix[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected stableService: StableMySuffixService,
        protected countryService: CountryMySuffixService,
        protected personService: PersonMySuffixService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ stable }) => {
            this.stable = stable;
        });
        this.countryService.query().subscribe(
            (res: HttpResponse<ICountryMySuffix[]>) => {
                this.countries = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.personService.query().subscribe(
            (res: HttpResponse<IPersonMySuffix[]>) => {
                this.people = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.stable.id !== undefined) {
            this.subscribeToSaveResponse(this.stableService.update(this.stable));
        } else {
            this.subscribeToSaveResponse(this.stableService.create(this.stable));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IStableMySuffix>>) {
        result.subscribe((res: HttpResponse<IStableMySuffix>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackPersonById(index: number, item: IPersonMySuffix) {
        return item.id;
    }

    getSelected(selectedVals: Array<any>, option: any) {
        if (selectedVals) {
            for (let i = 0; i < selectedVals.length; i++) {
                if (option.id === selectedVals[i].id) {
                    return selectedVals[i];
                }
            }
        }
        return option;
    }
}
