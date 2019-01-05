import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ILevelDressageMySuffix } from 'app/shared/model/level-dressage-my-suffix.model';
import { LevelDressageMySuffixService } from './level-dressage-my-suffix.service';

@Component({
    selector: 'jhi-level-dressage-my-suffix-delete-dialog',
    templateUrl: './level-dressage-my-suffix-delete-dialog.component.html'
})
export class LevelDressageMySuffixDeleteDialogComponent {
    levelDressage: ILevelDressageMySuffix;

    constructor(
        protected levelDressageService: LevelDressageMySuffixService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.levelDressageService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'levelDressageListModification',
                content: 'Deleted an levelDressage'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-level-dressage-my-suffix-delete-popup',
    template: ''
})
export class LevelDressageMySuffixDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ levelDressage }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(LevelDressageMySuffixDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.levelDressage = levelDressage;
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
