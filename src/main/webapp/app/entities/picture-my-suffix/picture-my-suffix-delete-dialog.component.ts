import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPictureMySuffix } from 'app/shared/model/picture-my-suffix.model';
import { PictureMySuffixService } from './picture-my-suffix.service';

@Component({
    selector: 'jhi-picture-my-suffix-delete-dialog',
    templateUrl: './picture-my-suffix-delete-dialog.component.html'
})
export class PictureMySuffixDeleteDialogComponent {
    picture: IPictureMySuffix;

    constructor(
        protected pictureService: PictureMySuffixService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.pictureService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'pictureListModification',
                content: 'Deleted an picture'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-picture-my-suffix-delete-popup',
    template: ''
})
export class PictureMySuffixDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ picture }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(PictureMySuffixDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.picture = picture;
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
