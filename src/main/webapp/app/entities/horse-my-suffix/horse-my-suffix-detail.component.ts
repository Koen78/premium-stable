import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IHorseMySuffix } from 'app/shared/model/horse-my-suffix.model';

@Component({
    selector: 'jhi-horse-my-suffix-detail',
    templateUrl: './horse-my-suffix-detail.component.html'
})
export class HorseMySuffixDetailComponent implements OnInit {
    horse: IHorseMySuffix;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ horse }) => {
            this.horse = horse;
        });
    }

    previousState() {
        window.history.back();
    }
}
