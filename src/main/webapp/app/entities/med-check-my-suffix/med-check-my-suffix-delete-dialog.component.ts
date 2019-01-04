import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IMedCheckMySuffix } from 'app/shared/model/med-check-my-suffix.model';
import { MedCheckMySuffixService } from './med-check-my-suffix.service';

@Component({
    selector: 'jhi-med-check-my-suffix-delete-dialog',
    templateUrl: './med-check-my-suffix-delete-dialog.component.html'
})
export class MedCheckMySuffixDeleteDialogComponent {
    medCheck: IMedCheckMySuffix;

    constructor(
        protected medCheckService: MedCheckMySuffixService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.medCheckService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'medCheckListModification',
                content: 'Deleted an medCheck'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-med-check-my-suffix-delete-popup',
    template: ''
})
export class MedCheckMySuffixDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ medCheck }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(MedCheckMySuffixDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.medCheck = medCheck;
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
