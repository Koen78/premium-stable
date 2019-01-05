import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IStableMySuffix } from 'app/shared/model/stable-my-suffix.model';

@Component({
    selector: 'jhi-stable-my-suffix-detail',
    templateUrl: './stable-my-suffix-detail.component.html'
})
export class StableMySuffixDetailComponent implements OnInit {
    stable: IStableMySuffix;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ stable }) => {
            this.stable = stable;
        });
    }

    previousState() {
        window.history.back();
    }
}
