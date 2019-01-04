import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ILevelJumpingMySuffix } from 'app/shared/model/level-jumping-my-suffix.model';
import { LevelJumpingMySuffixService } from './level-jumping-my-suffix.service';

@Component({
    selector: 'jhi-level-jumping-my-suffix-update',
    templateUrl: './level-jumping-my-suffix-update.component.html'
})
export class LevelJumpingMySuffixUpdateComponent implements OnInit {
    levelJumping: ILevelJumpingMySuffix;
    isSaving: boolean;

    constructor(protected levelJumpingService: LevelJumpingMySuffixService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ levelJumping }) => {
            this.levelJumping = levelJumping;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.levelJumping.id !== undefined) {
            this.subscribeToSaveResponse(this.levelJumpingService.update(this.levelJumping));
        } else {
            this.subscribeToSaveResponse(this.levelJumpingService.create(this.levelJumping));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<ILevelJumpingMySuffix>>) {
        result.subscribe(
            (res: HttpResponse<ILevelJumpingMySuffix>) => this.onSaveSuccess(),
            (res: HttpErrorResponse) => this.onSaveError()
        );
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}
