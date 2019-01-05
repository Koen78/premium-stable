import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IColorMySuffix } from 'app/shared/model/color-my-suffix.model';
import { ColorMySuffixService } from './color-my-suffix.service';

@Component({
    selector: 'jhi-color-my-suffix-update',
    templateUrl: './color-my-suffix-update.component.html'
})
export class ColorMySuffixUpdateComponent implements OnInit {
    color: IColorMySuffix;
    isSaving: boolean;

    constructor(protected colorService: ColorMySuffixService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ color }) => {
            this.color = color;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.color.id !== undefined) {
            this.subscribeToSaveResponse(this.colorService.update(this.color));
        } else {
            this.subscribeToSaveResponse(this.colorService.create(this.color));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IColorMySuffix>>) {
        result.subscribe((res: HttpResponse<IColorMySuffix>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}
