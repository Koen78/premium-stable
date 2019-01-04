import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ILevelDressageMySuffix } from 'app/shared/model/level-dressage-my-suffix.model';
import { AccountService } from 'app/core';
import { LevelDressageMySuffixService } from './level-dressage-my-suffix.service';

@Component({
    selector: 'jhi-level-dressage-my-suffix',
    templateUrl: './level-dressage-my-suffix.component.html'
})
export class LevelDressageMySuffixComponent implements OnInit, OnDestroy {
    levelDressages: ILevelDressageMySuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        protected levelDressageService: LevelDressageMySuffixService,
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
            this.levelDressageService
                .search({
                    query: this.currentSearch
                })
                .subscribe(
                    (res: HttpResponse<ILevelDressageMySuffix[]>) => (this.levelDressages = res.body),
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            return;
        }
        this.levelDressageService.query().subscribe(
            (res: HttpResponse<ILevelDressageMySuffix[]>) => {
                this.levelDressages = res.body;
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
        this.registerChangeInLevelDressages();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ILevelDressageMySuffix) {
        return item.id;
    }

    registerChangeInLevelDressages() {
        this.eventSubscriber = this.eventManager.subscribe('levelDressageListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
