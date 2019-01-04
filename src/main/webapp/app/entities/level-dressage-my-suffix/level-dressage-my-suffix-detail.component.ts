import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ILevelDressageMySuffix } from 'app/shared/model/level-dressage-my-suffix.model';

@Component({
    selector: 'jhi-level-dressage-my-suffix-detail',
    templateUrl: './level-dressage-my-suffix-detail.component.html'
})
export class LevelDressageMySuffixDetailComponent implements OnInit {
    levelDressage: ILevelDressageMySuffix;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ levelDressage }) => {
            this.levelDressage = levelDressage;
        });
    }

    previousState() {
        window.history.back();
    }
}
