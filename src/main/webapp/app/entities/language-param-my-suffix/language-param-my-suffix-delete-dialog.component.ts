import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ILanguageParamMySuffix } from 'app/shared/model/language-param-my-suffix.model';
import { LanguageParamMySuffixService } from './language-param-my-suffix.service';

@Component({
    selector: 'jhi-language-param-my-suffix-delete-dialog',
    templateUrl: './language-param-my-suffix-delete-dialog.component.html'
})
export class LanguageParamMySuffixDeleteDialogComponent {
    languageParam: ILanguageParamMySuffix;

    constructor(
        protected languageParamService: LanguageParamMySuffixService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.languageParamService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'languageParamListModification',
                content: 'Deleted an languageParam'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-language-param-my-suffix-delete-popup',
    template: ''
})
export class LanguageParamMySuffixDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ languageParam }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(LanguageParamMySuffixDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.languageParam = languageParam;
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
