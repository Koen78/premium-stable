import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { HorseMySuffix } from 'app/shared/model/horse-my-suffix.model';
import { HorseMySuffixService } from './horse-my-suffix.service';
import { HorseMySuffixComponent } from './horse-my-suffix.component';
import { HorseMySuffixDetailComponent } from './horse-my-suffix-detail.component';
import { HorseMySuffixUpdateComponent } from './horse-my-suffix-update.component';
import { HorseMySuffixDeletePopupComponent } from './horse-my-suffix-delete-dialog.component';
import { IHorseMySuffix } from 'app/shared/model/horse-my-suffix.model';

@Injectable({ providedIn: 'root' })
export class HorseMySuffixResolve implements Resolve<IHorseMySuffix> {
    constructor(private service: HorseMySuffixService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<HorseMySuffix> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<HorseMySuffix>) => response.ok),
                map((horse: HttpResponse<HorseMySuffix>) => horse.body)
            );
        }
        return of(new HorseMySuffix());
    }
}

export const horseRoute: Routes = [
    {
        path: 'horse-my-suffix',
        component: HorseMySuffixComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'Horses'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'horse-my-suffix/:id/view',
        component: HorseMySuffixDetailComponent,
        resolve: {
            horse: HorseMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Horses'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'horse-my-suffix/new',
        component: HorseMySuffixUpdateComponent,
        resolve: {
            horse: HorseMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Horses'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'horse-my-suffix/:id/edit',
        component: HorseMySuffixUpdateComponent,
        resolve: {
            horse: HorseMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Horses'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const horsePopupRoute: Routes = [
    {
        path: 'horse-my-suffix/:id/delete',
        component: HorseMySuffixDeletePopupComponent,
        resolve: {
            horse: HorseMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Horses'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
