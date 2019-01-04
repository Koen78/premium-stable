import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { MedCheckDetMySuffix } from 'app/shared/model/med-check-det-my-suffix.model';
import { MedCheckDetMySuffixService } from './med-check-det-my-suffix.service';
import { MedCheckDetMySuffixComponent } from './med-check-det-my-suffix.component';
import { MedCheckDetMySuffixDetailComponent } from './med-check-det-my-suffix-detail.component';
import { MedCheckDetMySuffixUpdateComponent } from './med-check-det-my-suffix-update.component';
import { MedCheckDetMySuffixDeletePopupComponent } from './med-check-det-my-suffix-delete-dialog.component';
import { IMedCheckDetMySuffix } from 'app/shared/model/med-check-det-my-suffix.model';

@Injectable({ providedIn: 'root' })
export class MedCheckDetMySuffixResolve implements Resolve<IMedCheckDetMySuffix> {
    constructor(private service: MedCheckDetMySuffixService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<MedCheckDetMySuffix> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<MedCheckDetMySuffix>) => response.ok),
                map((medCheckDet: HttpResponse<MedCheckDetMySuffix>) => medCheckDet.body)
            );
        }
        return of(new MedCheckDetMySuffix());
    }
}

export const medCheckDetRoute: Routes = [
    {
        path: 'med-check-det-my-suffix',
        component: MedCheckDetMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'MedCheckDets'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'med-check-det-my-suffix/:id/view',
        component: MedCheckDetMySuffixDetailComponent,
        resolve: {
            medCheckDet: MedCheckDetMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'MedCheckDets'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'med-check-det-my-suffix/new',
        component: MedCheckDetMySuffixUpdateComponent,
        resolve: {
            medCheckDet: MedCheckDetMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'MedCheckDets'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'med-check-det-my-suffix/:id/edit',
        component: MedCheckDetMySuffixUpdateComponent,
        resolve: {
            medCheckDet: MedCheckDetMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'MedCheckDets'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const medCheckDetPopupRoute: Routes = [
    {
        path: 'med-check-det-my-suffix/:id/delete',
        component: MedCheckDetMySuffixDeletePopupComponent,
        resolve: {
            medCheckDet: MedCheckDetMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'MedCheckDets'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
