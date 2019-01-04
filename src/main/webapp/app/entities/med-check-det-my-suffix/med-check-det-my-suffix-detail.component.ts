import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IMedCheckDetMySuffix } from 'app/shared/model/med-check-det-my-suffix.model';

@Component({
    selector: 'jhi-med-check-det-my-suffix-detail',
    templateUrl: './med-check-det-my-suffix-detail.component.html'
})
export class MedCheckDetMySuffixDetailComponent implements OnInit {
    medCheckDet: IMedCheckDetMySuffix;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ medCheckDet }) => {
            this.medCheckDet = medCheckDet;
        });
    }

    previousState() {
        window.history.back();
    }
}
