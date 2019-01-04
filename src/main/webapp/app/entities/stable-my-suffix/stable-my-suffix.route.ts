import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StableMySuffix } from 'app/shared/model/stable-my-suffix.model';
import { StableMySuffixService } from './stable-my-suffix.service';
import { StableMySuffixComponent } from './stable-my-suffix.component';
import { StableMySuffixDetailComponent } from './stable-my-suffix-detail.component';
import { StableMySuffixUpdateComponent } from './stable-my-suffix-update.component';
import { StableMySuffixDeletePopupComponent } from './stable-my-suffix-delete-dialog.component';
import { IStableMySuffix } from 'app/shared/model/stable-my-suffix.model';

@Injectable({ providedIn: 'root' })
export class StableMySuffixResolve implements Resolve<IStableMySuffix> {
    constructor(private service: StableMySuffixService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<StableMySuffix> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<StableMySuffix>) => response.ok),
                map((stable: HttpResponse<StableMySuffix>) => stable.body)
            );
        }
        return of(new StableMySuffix());
    }
}

export const stableRoute: Routes = [
    {
        path: 'stable-my-suffix',
        component: StableMySuffixComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'Stables'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'stable-my-suffix/:id/view',
        component: StableMySuffixDetailComponent,
        resolve: {
            stable: StableMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Stables'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'stable-my-suffix/new',
        component: StableMySuffixUpdateComponent,
        resolve: {
            stable: StableMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Stables'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'stable-my-suffix/:id/edit',
        component: StableMySuffixUpdateComponent,
        resolve: {
            stable: StableMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Stables'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const stablePopupRoute: Routes = [
    {
        path: 'stable-my-suffix/:id/delete',
        component: StableMySuffixDeletePopupComponent,
        resolve: {
            stable: StableMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Stables'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
