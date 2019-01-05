import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ILevelJumpingMySuffix } from 'app/shared/model/level-jumping-my-suffix.model';

@Component({
    selector: 'jhi-level-jumping-my-suffix-detail',
    templateUrl: './level-jumping-my-suffix-detail.component.html'
})
export class LevelJumpingMySuffixDetailComponent implements OnInit {
    levelJumping: ILevelJumpingMySuffix;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ levelJumping }) => {
            this.levelJumping = levelJumping;
        });
    }

    previousState() {
        window.history.back();
    }
}
