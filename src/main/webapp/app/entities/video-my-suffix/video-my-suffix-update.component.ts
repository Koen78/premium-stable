import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { JhiAlertService } from 'ng-jhipster';

import { IVideoMySuffix } from 'app/shared/model/video-my-suffix.model';
import { VideoMySuffixService } from './video-my-suffix.service';
import { IHorseMySuffix } from 'app/shared/model/horse-my-suffix.model';
import { HorseMySuffixService } from 'app/entities/horse-my-suffix';

@Component({
    selector: 'jhi-video-my-suffix-update',
    templateUrl: './video-my-suffix-update.component.html'
})
export class VideoMySuffixUpdateComponent implements OnInit {
    video: IVideoMySuffix;
    isSaving: boolean;

    horses: IHorseMySuffix[];
    dateDp: any;

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected videoService: VideoMySuffixService,
        protected horseService: HorseMySuffixService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ video }) => {
            this.video = video;
        });
        this.horseService.query().subscribe(
            (res: HttpResponse<IHorseMySuffix[]>) => {
                this.horses = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.video.id !== undefined) {
            this.subscribeToSaveResponse(this.videoService.update(this.video));
        } else {
            this.subscribeToSaveResponse(this.videoService.create(this.video));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IVideoMySuffix>>) {
        result.subscribe((res: HttpResponse<IVideoMySuffix>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackHorseById(index: number, item: IHorseMySuffix) {
        return item.id;
    }
}
