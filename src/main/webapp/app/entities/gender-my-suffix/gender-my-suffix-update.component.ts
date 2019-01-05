import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IGenderMySuffix } from 'app/shared/model/gender-my-suffix.model';
import { GenderMySuffixService } from './gender-my-suffix.service';

@Component({
    selector: 'jhi-gender-my-suffix-update',
    templateUrl: './gender-my-suffix-update.component.html'
})
export class GenderMySuffixUpdateComponent implements OnInit {
    gender: IGenderMySuffix;
    isSaving: boolean;

    constructor(protected genderService: GenderMySuffixService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ gender }) => {
            this.gender = gender;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.gender.id !== undefined) {
            this.subscribeToSaveResponse(this.genderService.update(this.gender));
        } else {
            this.subscribeToSaveResponse(this.genderService.create(this.gender));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IGenderMySuffix>>) {
        result.subscribe((res: HttpResponse<IGenderMySuffix>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}
