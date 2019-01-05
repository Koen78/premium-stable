import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ILanguageParamMySuffix } from 'app/shared/model/language-param-my-suffix.model';
import { LanguageParamMySuffixService } from './language-param-my-suffix.service';

@Component({
    selector: 'jhi-language-param-my-suffix-update',
    templateUrl: './language-param-my-suffix-update.component.html'
})
export class LanguageParamMySuffixUpdateComponent implements OnInit {
    languageParam: ILanguageParamMySuffix;
    isSaving: boolean;

    constructor(protected languageParamService: LanguageParamMySuffixService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ languageParam }) => {
            this.languageParam = languageParam;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.languageParam.id !== undefined) {
            this.subscribeToSaveResponse(this.languageParamService.update(this.languageParam));
        } else {
            this.subscribeToSaveResponse(this.languageParamService.create(this.languageParam));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<ILanguageParamMySuffix>>) {
        result.subscribe(
            (res: HttpResponse<ILanguageParamMySuffix>) => this.onSaveSuccess(),
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
