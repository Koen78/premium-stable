import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { JhiAlertService } from 'ng-jhipster';

import { IHorseMySuffix } from 'app/shared/model/horse-my-suffix.model';
import { HorseMySuffixService } from './horse-my-suffix.service';
import { IStableMySuffix } from 'app/shared/model/stable-my-suffix.model';
import { StableMySuffixService } from 'app/entities/stable-my-suffix';
import { ILevelDressageMySuffix } from 'app/shared/model/level-dressage-my-suffix.model';
import { LevelDressageMySuffixService } from 'app/entities/level-dressage-my-suffix';
import { ILevelJumpingMySuffix } from 'app/shared/model/level-jumping-my-suffix.model';
import { LevelJumpingMySuffixService } from 'app/entities/level-jumping-my-suffix';
import { IGenderMySuffix } from 'app/shared/model/gender-my-suffix.model';
import { GenderMySuffixService } from 'app/entities/gender-my-suffix';
import { IColorMySuffix } from 'app/shared/model/color-my-suffix.model';
import { ColorMySuffixService } from 'app/entities/color-my-suffix';
import { IPersonMySuffix } from 'app/shared/model/person-my-suffix.model';
import { PersonMySuffixService } from 'app/entities/person-my-suffix';

@Component({
    selector: 'jhi-horse-my-suffix-update',
    templateUrl: './horse-my-suffix-update.component.html'
})
export class HorseMySuffixUpdateComponent implements OnInit {
    horse: IHorseMySuffix;
    isSaving: boolean;

    stables: IStableMySuffix[];

    leveldressages: ILevelDressageMySuffix[];

    leveljumpings: ILevelJumpingMySuffix[];

    genders: IGenderMySuffix[];

    colors: IColorMySuffix[];

    people: IPersonMySuffix[];
    birthdayDp: any;

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected horseService: HorseMySuffixService,
        protected stableService: StableMySuffixService,
        protected levelDressageService: LevelDressageMySuffixService,
        protected levelJumpingService: LevelJumpingMySuffixService,
        protected genderService: GenderMySuffixService,
        protected colorService: ColorMySuffixService,
        protected personService: PersonMySuffixService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ horse }) => {
            this.horse = horse;
        });
        this.stableService.query().subscribe(
            (res: HttpResponse<IStableMySuffix[]>) => {
                this.stables = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.levelDressageService.query().subscribe(
            (res: HttpResponse<ILevelDressageMySuffix[]>) => {
                this.leveldressages = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.levelJumpingService.query().subscribe(
            (res: HttpResponse<ILevelJumpingMySuffix[]>) => {
                this.leveljumpings = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.genderService.query().subscribe(
            (res: HttpResponse<IGenderMySuffix[]>) => {
                this.genders = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.colorService.query().subscribe(
            (res: HttpResponse<IColorMySuffix[]>) => {
                this.colors = res.body;
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
        if (this.horse.id !== undefined) {
            this.subscribeToSaveResponse(this.horseService.update(this.horse));
        } else {
            this.subscribeToSaveResponse(this.horseService.create(this.horse));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IHorseMySuffix>>) {
        result.subscribe((res: HttpResponse<IHorseMySuffix>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackStableById(index: number, item: IStableMySuffix) {
        return item.id;
    }

    trackLevelDressageById(index: number, item: ILevelDressageMySuffix) {
        return item.id;
    }

    trackLevelJumpingById(index: number, item: ILevelJumpingMySuffix) {
        return item.id;
    }

    trackGenderById(index: number, item: IGenderMySuffix) {
        return item.id;
    }

    trackColorById(index: number, item: IColorMySuffix) {
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
