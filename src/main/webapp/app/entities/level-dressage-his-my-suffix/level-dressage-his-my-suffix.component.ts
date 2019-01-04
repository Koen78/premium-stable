import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ILevelDressageHisMySuffix } from 'app/shared/model/level-dressage-his-my-suffix.model';
import { AccountService } from 'app/core';
import { LevelDressageHisMySuffixService } from './level-dressage-his-my-suffix.service';

@Component({
    selector: 'jhi-level-dressage-his-my-suffix',
    templateUrl: './level-dressage-his-my-suffix.component.html'
})
export class LevelDressageHisMySuffixComponent implements OnInit, OnDestroy {
    levelDressageHis: ILevelDressageHisMySuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        protected levelDressageHisService: LevelDressageHisMySuffixService,
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
            this.levelDressageHisService
                .search({
                    query: this.currentSearch
                })
                .subscribe(
                    (res: HttpResponse<ILevelDressageHisMySuffix[]>) => (this.levelDressageHis = res.body),
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            return;
        }
        this.levelDressageHisService.query().subscribe(
            (res: HttpResponse<ILevelDressageHisMySuffix[]>) => {
                this.levelDressageHis = res.body;
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
        this.registerChangeInLevelDressageHis();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ILevelDressageHisMySuffix) {
        return item.id;
    }

    registerChangeInLevelDressageHis() {
        this.eventSubscriber = this.eventManager.subscribe('levelDressageHisListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
