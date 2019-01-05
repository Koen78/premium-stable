import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IRaceMySuffix } from 'app/shared/model/race-my-suffix.model';
import { RaceMySuffixService } from './race-my-suffix.service';

@Component({
    selector: 'jhi-race-my-suffix-delete-dialog',
    templateUrl: './race-my-suffix-delete-dialog.component.html'
})
export class RaceMySuffixDeleteDialogComponent {
    race: IRaceMySuffix;

    constructor(protected raceService: RaceMySuffixService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.raceService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'raceListModification',
                content: 'Deleted an race'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-race-my-suffix-delete-popup',
    template: ''
})
export class RaceMySuffixDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ race }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(RaceMySuffixDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.race = race;
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
