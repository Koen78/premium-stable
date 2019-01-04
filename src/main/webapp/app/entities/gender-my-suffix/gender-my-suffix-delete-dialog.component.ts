import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IGenderMySuffix } from 'app/shared/model/gender-my-suffix.model';
import { GenderMySuffixService } from './gender-my-suffix.service';

@Component({
    selector: 'jhi-gender-my-suffix-delete-dialog',
    templateUrl: './gender-my-suffix-delete-dialog.component.html'
})
export class GenderMySuffixDeleteDialogComponent {
    gender: IGenderMySuffix;

    constructor(
        protected genderService: GenderMySuffixService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.genderService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'genderListModification',
                content: 'Deleted an gender'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-gender-my-suffix-delete-popup',
    template: ''
})
export class GenderMySuffixDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ gender }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(GenderMySuffixDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.gender = gender;
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
