import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IHorseMySuffix } from 'app/shared/model/horse-my-suffix.model';
import { HorseMySuffixService } from './horse-my-suffix.service';

@Component({
    selector: 'jhi-horse-my-suffix-delete-dialog',
    templateUrl: './horse-my-suffix-delete-dialog.component.html'
})
export class HorseMySuffixDeleteDialogComponent {
    horse: IHorseMySuffix;

    constructor(
        protected horseService: HorseMySuffixService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.horseService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'horseListModification',
                content: 'Deleted an horse'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-horse-my-suffix-delete-popup',
    template: ''
})
export class HorseMySuffixDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ horse }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(HorseMySuffixDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.horse = horse;
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
