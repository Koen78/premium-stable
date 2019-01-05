import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IRaceMySuffix } from 'app/shared/model/race-my-suffix.model';
import { AccountService } from 'app/core';
import { RaceMySuffixService } from './race-my-suffix.service';

@Component({
    selector: 'jhi-race-my-suffix',
    templateUrl: './race-my-suffix.component.html'
})
export class RaceMySuffixComponent implements OnInit, OnDestroy {
    races: IRaceMySuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        protected raceService: RaceMySuffixService,
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
            this.raceService
                .search({
                    query: this.currentSearch
                })
                .subscribe(
                    (res: HttpResponse<IRaceMySuffix[]>) => (this.races = res.body),
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            return;
        }
        this.raceService.query().subscribe(
            (res: HttpResponse<IRaceMySuffix[]>) => {
                this.races = res.body;
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
        this.registerChangeInRaces();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IRaceMySuffix) {
        return item.id;
    }

    registerChangeInRaces() {
        this.eventSubscriber = this.eventManager.subscribe('raceListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
