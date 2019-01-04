import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IMedCheckXrayMySuffix } from 'app/shared/model/med-check-xray-my-suffix.model';
import { MedCheckXrayMySuffixService } from './med-check-xray-my-suffix.service';

@Component({
    selector: 'jhi-med-check-xray-my-suffix-delete-dialog',
    templateUrl: './med-check-xray-my-suffix-delete-dialog.component.html'
})
export class MedCheckXrayMySuffixDeleteDialogComponent {
    medCheckXray: IMedCheckXrayMySuffix;

    constructor(
        protected medCheckXrayService: MedCheckXrayMySuffixService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.medCheckXrayService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'medCheckXrayListModification',
                content: 'Deleted an medCheckXray'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-med-check-xray-my-suffix-delete-popup',
    template: ''
})
export class MedCheckXrayMySuffixDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ medCheckXray }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(MedCheckXrayMySuffixDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.medCheckXray = medCheckXray;
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
