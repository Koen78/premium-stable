import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IMedCheckDetMySuffix } from 'app/shared/model/med-check-det-my-suffix.model';
import { MedCheckDetMySuffixService } from './med-check-det-my-suffix.service';

@Component({
    selector: 'jhi-med-check-det-my-suffix-delete-dialog',
    templateUrl: './med-check-det-my-suffix-delete-dialog.component.html'
})
export class MedCheckDetMySuffixDeleteDialogComponent {
    medCheckDet: IMedCheckDetMySuffix;

    constructor(
        protected medCheckDetService: MedCheckDetMySuffixService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.medCheckDetService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'medCheckDetListModification',
                content: 'Deleted an medCheckDet'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-med-check-det-my-suffix-delete-popup',
    template: ''
})
export class MedCheckDetMySuffixDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ medCheckDet }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(MedCheckDetMySuffixDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.medCheckDet = medCheckDet;
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
