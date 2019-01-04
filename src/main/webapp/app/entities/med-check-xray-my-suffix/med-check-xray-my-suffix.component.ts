import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { IMedCheckXrayMySuffix } from 'app/shared/model/med-check-xray-my-suffix.model';
import { AccountService } from 'app/core';
import { MedCheckXrayMySuffixService } from './med-check-xray-my-suffix.service';

@Component({
    selector: 'jhi-med-check-xray-my-suffix',
    templateUrl: './med-check-xray-my-suffix.component.html'
})
export class MedCheckXrayMySuffixComponent implements OnInit, OnDestroy {
    medCheckXrays: IMedCheckXrayMySuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        protected medCheckXrayService: MedCheckXrayMySuffixService,
        protected jhiAlertService: JhiAlertService,
        protected dataUtils: JhiDataUtils,
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
            this.medCheckXrayService
                .search({
                    query: this.currentSearch
                })
                .subscribe(
                    (res: HttpResponse<IMedCheckXrayMySuffix[]>) => (this.medCheckXrays = res.body),
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            return;
        }
        this.medCheckXrayService.query().subscribe(
            (res: HttpResponse<IMedCheckXrayMySuffix[]>) => {
                this.medCheckXrays = res.body;
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
        this.registerChangeInMedCheckXrays();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IMedCheckXrayMySuffix) {
        return item.id;
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    registerChangeInMedCheckXrays() {
        this.eventSubscriber = this.eventManager.subscribe('medCheckXrayListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
