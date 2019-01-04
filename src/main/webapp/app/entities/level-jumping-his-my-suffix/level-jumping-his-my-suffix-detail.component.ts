import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ILevelJumpingHisMySuffix } from 'app/shared/model/level-jumping-his-my-suffix.model';

@Component({
    selector: 'jhi-level-jumping-his-my-suffix-detail',
    templateUrl: './level-jumping-his-my-suffix-detail.component.html'
})
export class LevelJumpingHisMySuffixDetailComponent implements OnInit {
    levelJumpingHis: ILevelJumpingHisMySuffix;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ levelJumpingHis }) => {
            this.levelJumpingHis = levelJumpingHis;
        });
    }

    previousState() {
        window.history.back();
    }
}
