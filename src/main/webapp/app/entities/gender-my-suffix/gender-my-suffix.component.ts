import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IGenderMySuffix } from 'app/shared/model/gender-my-suffix.model';
import { AccountService } from 'app/core';
import { GenderMySuffixService } from './gender-my-suffix.service';

@Component({
    selector: 'jhi-gender-my-suffix',
    templateUrl: './gender-my-suffix.component.html'
})
export class GenderMySuffixComponent implements OnInit, OnDestroy {
    genders: IGenderMySuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        protected genderService: GenderMySuffixService,
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
            this.genderService
                .search({
                    query: this.currentSearch
                })
                .subscribe(
                    (res: HttpResponse<IGenderMySuffix[]>) => (this.genders = res.body),
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            return;
        }
        this.genderService.query().subscribe(
            (res: HttpResponse<IGenderMySuffix[]>) => {
                this.genders = res.body;
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
        this.registerChangeInGenders();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IGenderMySuffix) {
        return item.id;
    }

    registerChangeInGenders() {
        this.eventSubscriber = this.eventManager.subscribe('genderListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
