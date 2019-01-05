import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IEquineSpeciesMySuffix } from 'app/shared/model/equine-species-my-suffix.model';
import { EquineSpeciesMySuffixService } from './equine-species-my-suffix.service';

@Component({
    selector: 'jhi-equine-species-my-suffix-delete-dialog',
    templateUrl: './equine-species-my-suffix-delete-dialog.component.html'
})
export class EquineSpeciesMySuffixDeleteDialogComponent {
    equineSpecies: IEquineSpeciesMySuffix;

    constructor(
        protected equineSpeciesService: EquineSpeciesMySuffixService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.equineSpeciesService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'equineSpeciesListModification',
                content: 'Deleted an equineSpecies'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-equine-species-my-suffix-delete-popup',
    template: ''
})
export class EquineSpeciesMySuffixDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ equineSpecies }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(EquineSpeciesMySuffixDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.equineSpecies = equineSpecies;
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
