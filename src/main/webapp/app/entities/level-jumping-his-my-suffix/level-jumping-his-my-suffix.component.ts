import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ILevelJumpingHisMySuffix } from 'app/shared/model/level-jumping-his-my-suffix.model';
import { AccountService } from 'app/core';
import { LevelJumpingHisMySuffixService } from './level-jumping-his-my-suffix.service';

@Component({
    selector: 'jhi-level-jumping-his-my-suffix',
    templateUrl: './level-jumping-his-my-suffix.component.html'
})
export class LevelJumpingHisMySuffixComponent implements OnInit, OnDestroy {
    levelJumpingHis: ILevelJumpingHisMySuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        protected levelJumpingHisService: LevelJumpingHisMySuffixService,
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
            this.levelJumpingHisService
                .search({
                    query: this.currentSearch
                })
                .subscribe(
                    (res: HttpResponse<ILevelJumpingHisMySuffix[]>) => (this.levelJumpingHis = res.body),
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            return;
        }
        this.levelJumpingHisService.query().subscribe(
            (res: HttpResponse<ILevelJumpingHisMySuffix[]>) => {
                this.levelJumpingHis = res.body;
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
        this.registerChangeInLevelJumpingHis();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ILevelJumpingHisMySuffix) {
        return item.id;
    }

    registerChangeInLevelJumpingHis() {
        this.eventSubscriber = this.eventManager.subscribe('levelJumpingHisListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
