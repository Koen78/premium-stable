import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ILevelDressageMySuffix } from 'app/shared/model/level-dressage-my-suffix.model';
import { LevelDressageMySuffixService } from './level-dressage-my-suffix.service';

@Component({
    selector: 'jhi-level-dressage-my-suffix-update',
    templateUrl: './level-dressage-my-suffix-update.component.html'
})
export class LevelDressageMySuffixUpdateComponent implements OnInit {
    levelDressage: ILevelDressageMySuffix;
    isSaving: boolean;

    constructor(protected levelDressageService: LevelDressageMySuffixService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ levelDressage }) => {
            this.levelDressage = levelDressage;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.levelDressage.id !== undefined) {
            this.subscribeToSaveResponse(this.levelDressageService.update(this.levelDressage));
        } else {
            this.subscribeToSaveResponse(this.levelDressageService.create(this.levelDressage));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<ILevelDressageMySuffix>>) {
        result.subscribe(
            (res: HttpResponse<ILevelDressageMySuffix>) => this.onSaveSuccess(),
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
}
