import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IColorMySuffix } from 'app/shared/model/color-my-suffix.model';
import { AccountService } from 'app/core';
import { ColorMySuffixService } from './color-my-suffix.service';

@Component({
    selector: 'jhi-color-my-suffix',
    templateUrl: './color-my-suffix.component.html'
})
export class ColorMySuffixComponent implements OnInit, OnDestroy {
    colors: IColorMySuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        protected colorService: ColorMySuffixService,
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
            this.colorService
                .search({
                    query: this.currentSearch
                })
                .subscribe(
                    (res: HttpResponse<IColorMySuffix[]>) => (this.colors = res.body),
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            return;
        }
        this.colorService.query().subscribe(
            (res: HttpResponse<IColorMySuffix[]>) => {
                this.colors = res.body;
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
        this.registerChangeInColors();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IColorMySuffix) {
        return item.id;
    }

    registerChangeInColors() {
        this.eventSubscriber = this.eventManager.subscribe('colorListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
