import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IEquineSpeciesMySuffix } from 'app/shared/model/equine-species-my-suffix.model';
import { AccountService } from 'app/core';
import { EquineSpeciesMySuffixService } from './equine-species-my-suffix.service';

@Component({
    selector: 'jhi-equine-species-my-suffix',
    templateUrl: './equine-species-my-suffix.component.html'
})
export class EquineSpeciesMySuffixComponent implements OnInit, OnDestroy {
    equineSpecies: IEquineSpeciesMySuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        protected equineSpeciesService: EquineSpeciesMySuffixService,
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
            this.equineSpeciesService
                .search({
                    query: this.currentSearch
                })
                .subscribe(
                    (res: HttpResponse<IEquineSpeciesMySuffix[]>) => (this.equineSpecies = res.body),
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            return;
        }
        this.equineSpeciesService.query().subscribe(
            (res: HttpResponse<IEquineSpeciesMySuffix[]>) => {
                this.equineSpecies = res.body;
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
        this.registerChangeInEquineSpecies();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IEquineSpeciesMySuffix) {
        return item.id;
    }

    registerChangeInEquineSpecies() {
        this.eventSubscriber = this.eventManager.subscribe('equineSpeciesListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
