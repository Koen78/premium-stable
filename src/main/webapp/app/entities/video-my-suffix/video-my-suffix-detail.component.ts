import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IVideoMySuffix } from 'app/shared/model/video-my-suffix.model';

@Component({
    selector: 'jhi-video-my-suffix-detail',
    templateUrl: './video-my-suffix-detail.component.html'
})
export class VideoMySuffixDetailComponent implements OnInit {
    video: IVideoMySuffix;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ video }) => {
            this.video = video;
        });
    }

    previousState() {
        window.history.back();
    }
}
