import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IColorMySuffix } from 'app/shared/model/color-my-suffix.model';
import { ColorMySuffixService } from './color-my-suffix.service';

@Component({
    selector: 'jhi-color-my-suffix-delete-dialog',
    templateUrl: './color-my-suffix-delete-dialog.component.html'
})
export class ColorMySuffixDeleteDialogComponent {
    color: IColorMySuffix;

    constructor(
        protected colorService: ColorMySuffixService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.colorService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'colorListModification',
                content: 'Deleted an color'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-color-my-suffix-delete-popup',
    template: ''
})
export class ColorMySuffixDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ color }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(ColorMySuffixDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.color = color;
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
