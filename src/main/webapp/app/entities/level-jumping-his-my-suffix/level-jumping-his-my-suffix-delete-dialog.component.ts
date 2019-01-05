import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ILevelJumpingHisMySuffix } from 'app/shared/model/level-jumping-his-my-suffix.model';
import { LevelJumpingHisMySuffixService } from './level-jumping-his-my-suffix.service';

@Component({
    selector: 'jhi-level-jumping-his-my-suffix-delete-dialog',
    templateUrl: './level-jumping-his-my-suffix-delete-dialog.component.html'
})
export class LevelJumpingHisMySuffixDeleteDialogComponent {
    levelJumpingHis: ILevelJumpingHisMySuffix;

    constructor(
        protected levelJumpingHisService: LevelJumpingHisMySuffixService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.levelJumpingHisService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'levelJumpingHisListModification',
                content: 'Deleted an levelJumpingHis'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-level-jumping-his-my-suffix-delete-popup',
    template: ''
})
export class LevelJumpingHisMySuffixDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ levelJumpingHis }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(LevelJumpingHisMySuffixDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.levelJumpingHis = levelJumpingHis;
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
