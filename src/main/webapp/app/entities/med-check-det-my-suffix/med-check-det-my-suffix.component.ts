import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IMedCheckDetMySuffix } from 'app/shared/model/med-check-det-my-suffix.model';
import { AccountService } from 'app/core';
import { MedCheckDetMySuffixService } from './med-check-det-my-suffix.service';

@Component({
    selector: 'jhi-med-check-det-my-suffix',
    templateUrl: './med-check-det-my-suffix.component.html'
})
export class MedCheckDetMySuffixComponent implements OnInit, OnDestroy {
    medCheckDets: IMedCheckDetMySuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        protected medCheckDetService: MedCheckDetMySuffixService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected activatedRoute: ActivatedRoute,
        protected accountService: AccountService
    ) {
        this.currentSearch =
            this.activatedRoute.snapshot && this.activatedRoute.snapshot.params['search']
                ? this.activatedRoute.snapshot.params['search']
                : '';
    }

    loadAll() {
        if (this.currentSearch) {
            this.medCheckDetService
                .search({
                    query: this.currentSearch
                })
                .subscribe(
                    (res: HttpResponse<IMedCheckDetMySuffix[]>) => (this.medCheckDets = res.body),
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            return;
        }
        this.medCheckDetService.query().subscribe(
            (res: HttpResponse<IMedCheckDetMySuffix[]>) => {
                this.medCheckDets = res.body;
                this.currentSearch = '';
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    search(query) {
        if (!query) {
            return this.clear();
        }
        this.currentSearch = query;
        this.loadAll();
    }

    clear() {
        this.currentSearch = '';
        this.loadAll();
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInMedCheckDets();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IMedCheckDetMySuffix) {
        return item.id;
    }

    registerChangeInMedCheckDets() {
        this.eventSubscriber = this.eventManager.subscribe('medCheckDetListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
