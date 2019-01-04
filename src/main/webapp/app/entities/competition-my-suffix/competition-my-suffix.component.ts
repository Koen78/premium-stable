import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ICompetitionMySuffix } from 'app/shared/model/competition-my-suffix.model';
import { AccountService } from 'app/core';
import { CompetitionMySuffixService } from './competition-my-suffix.service';

@Component({
    selector: 'jhi-competition-my-suffix',
    templateUrl: './competition-my-suffix.component.html'
})
export class CompetitionMySuffixComponent implements OnInit, OnDestroy {
    competitions: ICompetitionMySuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        protected competitionService: CompetitionMySuffixService,
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
            this.competitionService
                .search({
                    query: this.currentSearch
                })
                .subscribe(
                    (res: HttpResponse<ICompetitionMySuffix[]>) => (this.competitions = res.body),
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            return;
        }
        this.competitionService.query().subscribe(
            (res: HttpResponse<ICompetitionMySuffix[]>) => {
                this.competitions = res.body;
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
        this.registerChangeInCompetitions();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ICompetitionMySuffix) {
        return item.id;
    }

    registerChangeInCompetitions() {
        this.eventSubscriber = this.eventManager.subscribe('competitionListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
