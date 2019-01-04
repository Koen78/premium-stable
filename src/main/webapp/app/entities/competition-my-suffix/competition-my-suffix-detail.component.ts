import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICompetitionMySuffix } from 'app/shared/model/competition-my-suffix.model';

@Component({
    selector: 'jhi-competition-my-suffix-detail',
    templateUrl: './competition-my-suffix-detail.component.html'
})
export class CompetitionMySuffixDetailComponent implements OnInit {
    competition: ICompetitionMySuffix;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ competition }) => {
            this.competition = competition;
        });
    }

    previousState() {
        window.history.back();
    }
}
