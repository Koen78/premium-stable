import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICompetitionMySuffix } from 'app/shared/model/competition-my-suffix.model';
import { CompetitionMySuffixService } from './competition-my-suffix.service';

@Component({
    selector: 'jhi-competition-my-suffix-delete-dialog',
    templateUrl: './competition-my-suffix-delete-dialog.component.html'
})
export class CompetitionMySuffixDeleteDialogComponent {
    competition: ICompetitionMySuffix;

    constructor(
        protected competitionService: CompetitionMySuffixService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.competitionService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'competitionListModification',
                content: 'Deleted an competition'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-competition-my-suffix-delete-popup',
    template: ''
})
export class CompetitionMySuffixDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ competition }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(CompetitionMySuffixDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.competition = competition;
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
