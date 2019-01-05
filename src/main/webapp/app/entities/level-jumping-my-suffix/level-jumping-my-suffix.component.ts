import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ILevelJumpingMySuffix } from 'app/shared/model/level-jumping-my-suffix.model';
import { AccountService } from 'app/core';
import { LevelJumpingMySuffixService } from './level-jumping-my-suffix.service';

@Component({
    selector: 'jhi-level-jumping-my-suffix',
    templateUrl: './level-jumping-my-suffix.component.html'
})
export class LevelJumpingMySuffixComponent implements OnInit, OnDestroy {
    levelJumpings: ILevelJumpingMySuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        protected levelJumpingService: LevelJumpingMySuffixService,
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
            this.levelJumpingService
                .search({
                    query: this.currentSearch
                })
                .subscribe(
                    (res: HttpResponse<ILevelJumpingMySuffix[]>) => (this.levelJumpings = res.body),
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            return;
        }
        this.levelJumpingService.query().subscribe(
            (res: HttpResponse<ILevelJumpingMySuffix[]>) => {
                this.levelJumpings = res.body;
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
        this.registerChangeInLevelJumpings();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ILevelJumpingMySuffix) {
        return item.id;
    }

    registerChangeInLevelJumpings() {
        this.eventSubscriber = this.eventManager.subscribe('levelJumpingListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
