import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IPersonMySuffix } from 'app/shared/model/person-my-suffix.model';
import { PersonMySuffixService } from './person-my-suffix.service';
import { ILanguageParamMySuffix } from 'app/shared/model/language-param-my-suffix.model';
import { LanguageParamMySuffixService } from 'app/entities/language-param-my-suffix';
import { IStableMySuffix } from 'app/shared/model/stable-my-suffix.model';
import { StableMySuffixService } from 'app/entities/stable-my-suffix';
import { IHorseMySuffix } from 'app/shared/model/horse-my-suffix.model';
import { HorseMySuffixService } from 'app/entities/horse-my-suffix';

@Component({
    selector: 'jhi-person-my-suffix-update',
    templateUrl: './person-my-suffix-update.component.html'
})
export class PersonMySuffixUpdateComponent implements OnInit {
    person: IPersonMySuffix;
    isSaving: boolean;

    languageparams: ILanguageParamMySuffix[];

    stables: IStableMySuffix[];

    horses: IHorseMySuffix[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected personService: PersonMySuffixService,
        protected languageParamService: LanguageParamMySuffixService,
        protected stableService: StableMySuffixService,
        protected horseService: HorseMySuffixService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ person }) => {
            this.person = person;
        });
        this.languageParamService.query().subscribe(
            (res: HttpResponse<ILanguageParamMySuffix[]>) => {
                this.languageparams = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.stableService.query().subscribe(
            (res: HttpResponse<IStableMySuffix[]>) => {
                this.stables = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.horseService.query().subscribe(
            (res: HttpResponse<IHorseMySuffix[]>) => {
                this.horses = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.person.id !== undefined) {
            this.subscribeToSaveResponse(this.personService.update(this.person));
        } else {
            this.subscribeToSaveResponse(this.personService.create(this.person));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IPersonMySuffix>>) {
        result.subscribe((res: HttpResponse<IPersonMySuffix>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackLanguageParamById(index: number, item: ILanguageParamMySuffix) {
        return item.id;
    }

    trackStableById(index: number, item: IStableMySuffix) {
        return item.id;
    }

    trackHorseById(index: number, item: IHorseMySuffix) {
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
