import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ILanguageParamMySuffix } from 'app/shared/model/language-param-my-suffix.model';
import { AccountService } from 'app/core';
import { LanguageParamMySuffixService } from './language-param-my-suffix.service';

@Component({
    selector: 'jhi-language-param-my-suffix',
    templateUrl: './language-param-my-suffix.component.html'
})
export class LanguageParamMySuffixComponent implements OnInit, OnDestroy {
    languageParams: ILanguageParamMySuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        protected languageParamService: LanguageParamMySuffixService,
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
            this.languageParamService
                .search({
                    query: this.currentSearch
                })
                .subscribe(
                    (res: HttpResponse<ILanguageParamMySuffix[]>) => (this.languageParams = res.body),
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            return;
        }
        this.languageParamService.query().subscribe(
            (res: HttpResponse<ILanguageParamMySuffix[]>) => {
                this.languageParams = res.body;
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
        this.registerChangeInLanguageParams();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ILanguageParamMySuffix) {
        return item.id;
    }

    registerChangeInLanguageParams() {
        this.eventSubscriber = this.eventManager.subscribe('languageParamListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
