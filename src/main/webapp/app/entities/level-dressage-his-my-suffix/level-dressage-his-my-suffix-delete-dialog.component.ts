import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ILevelDressageHisMySuffix } from 'app/shared/model/level-dressage-his-my-suffix.model';
import { LevelDressageHisMySuffixService } from './level-dressage-his-my-suffix.service';

@Component({
    selector: 'jhi-level-dressage-his-my-suffix-delete-dialog',
    templateUrl: './level-dressage-his-my-suffix-delete-dialog.component.html'
})
export class LevelDressageHisMySuffixDeleteDialogComponent {
    levelDressageHis: ILevelDressageHisMySuffix;

    constructor(
        protected levelDressageHisService: LevelDressageHisMySuffixService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.levelDressageHisService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'levelDressageHisListModification',
                content: 'Deleted an levelDressageHis'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-level-dressage-his-my-suffix-delete-popup',
    template: ''
})
export class LevelDressageHisMySuffixDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ levelDressageHis }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(LevelDressageHisMySuffixDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.levelDressageHis = levelDressageHis;
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
