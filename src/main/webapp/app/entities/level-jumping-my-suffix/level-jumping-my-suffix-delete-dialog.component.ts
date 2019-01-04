import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ILevelJumpingMySuffix } from 'app/shared/model/level-jumping-my-suffix.model';
import { LevelJumpingMySuffixService } from './level-jumping-my-suffix.service';

@Component({
    selector: 'jhi-level-jumping-my-suffix-delete-dialog',
    templateUrl: './level-jumping-my-suffix-delete-dialog.component.html'
})
export class LevelJumpingMySuffixDeleteDialogComponent {
    levelJumping: ILevelJumpingMySuffix;

    constructor(
        protected levelJumpingService: LevelJumpingMySuffixService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.levelJumpingService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'levelJumpingListModification',
                content: 'Deleted an levelJumping'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-level-jumping-my-suffix-delete-popup',
    template: ''
})
export class LevelJumpingMySuffixDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ levelJumping }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(LevelJumpingMySuffixDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.levelJumping = levelJumping;
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
