import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ILevelDressageHisMySuffix } from 'app/shared/model/level-dressage-his-my-suffix.model';

@Component({
    selector: 'jhi-level-dressage-his-my-suffix-detail',
    templateUrl: './level-dressage-his-my-suffix-detail.component.html'
})
export class LevelDressageHisMySuffixDetailComponent implements OnInit {
    levelDressageHis: ILevelDressageHisMySuffix;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ levelDressageHis }) => {
            this.levelDressageHis = levelDressageHis;
        });
    }

    previousState() {
        window.history.back();
    }
}
