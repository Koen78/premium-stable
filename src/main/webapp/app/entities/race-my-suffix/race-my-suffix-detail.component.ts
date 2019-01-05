import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IRaceMySuffix } from 'app/shared/model/race-my-suffix.model';

@Component({
    selector: 'jhi-race-my-suffix-detail',
    templateUrl: './race-my-suffix-detail.component.html'
})
export class RaceMySuffixDetailComponent implements OnInit {
    race: IRaceMySuffix;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ race }) => {
            this.race = race;
        });
    }

    previousState() {
        window.history.back();
    }
}
