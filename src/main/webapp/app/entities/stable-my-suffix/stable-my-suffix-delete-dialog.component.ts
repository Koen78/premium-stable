import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IStableMySuffix } from 'app/shared/model/stable-my-suffix.model';
import { StableMySuffixService } from './stable-my-suffix.service';

@Component({
    selector: 'jhi-stable-my-suffix-delete-dialog',
    templateUrl: './stable-my-suffix-delete-dialog.component.html'
})
export class StableMySuffixDeleteDialogComponent {
    stable: IStableMySuffix;

    constructor(
        protected stableService: StableMySuffixService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.stableService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'stableListModification',
                content: 'Deleted an stable'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-stable-my-suffix-delete-popup',
    template: ''
})
export class StableMySuffixDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ stable }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(StableMySuffixDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.stable = stable;
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
