import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IGenderMySuffix } from 'app/shared/model/gender-my-suffix.model';

@Component({
    selector: 'jhi-gender-my-suffix-detail',
    templateUrl: './gender-my-suffix-detail.component.html'
})
export class GenderMySuffixDetailComponent implements OnInit {
    gender: IGenderMySuffix;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ gender }) => {
            this.gender = gender;
        });
    }

    previousState() {
        window.history.back();
    }
}
