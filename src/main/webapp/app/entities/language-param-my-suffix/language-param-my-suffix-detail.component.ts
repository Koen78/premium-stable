import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ILanguageParamMySuffix } from 'app/shared/model/language-param-my-suffix.model';

@Component({
    selector: 'jhi-language-param-my-suffix-detail',
    templateUrl: './language-param-my-suffix-detail.component.html'
})
export class LanguageParamMySuffixDetailComponent implements OnInit {
    languageParam: ILanguageParamMySuffix;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ languageParam }) => {
            this.languageParam = languageParam;
        });
    }

    previousState() {
        window.history.back();
    }
}
