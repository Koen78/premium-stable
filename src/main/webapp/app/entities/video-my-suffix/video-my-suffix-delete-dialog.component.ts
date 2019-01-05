import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IVideoMySuffix } from 'app/shared/model/video-my-suffix.model';
import { VideoMySuffixService } from './video-my-suffix.service';

@Component({
    selector: 'jhi-video-my-suffix-delete-dialog',
    templateUrl: './video-my-suffix-delete-dialog.component.html'
})
export class VideoMySuffixDeleteDialogComponent {
    video: IVideoMySuffix;

    constructor(
        protected videoService: VideoMySuffixService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.videoService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'videoListModification',
                content: 'Deleted an video'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-video-my-suffix-delete-popup',
    template: ''
})
export class VideoMySuffixDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ video }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(VideoMySuffixDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.video = video;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
