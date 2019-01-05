import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { MedCheckXrayMySuffix } from 'app/shared/model/med-check-xray-my-suffix.model';
import { MedCheckXrayMySuffixService } from './med-check-xray-my-suffix.service';
import { MedCheckXrayMySuffixComponent } from './med-check-xray-my-suffix.component';
import { MedCheckXrayMySuffixDetailComponent } from './med-check-xray-my-suffix-detail.component';
import { MedCheckXrayMySuffixUpdateComponent } from './med-check-xray-my-suffix-update.component';
import { MedCheckXrayMySuffixDeletePopupComponent } from './med-check-xray-my-suffix-delete-dialog.component';
import { IMedCheckXrayMySuffix } from 'app/shared/model/med-check-xray-my-suffix.model';

@Injectable({ providedIn: 'root' })
export class MedCheckXrayMySuffixResolve implements Resolve<IMedCheckXrayMySuffix> {
    constructor(private service: MedCheckXrayMySuffixService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<MedCheckXrayMySuffix> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<MedCheckXrayMySuffix>) => response.ok),
                map((medCheckXray: HttpResponse<MedCheckXrayMySuffix>) => medCheckXray.body)
            );
        }
        return of(new MedCheckXrayMySuffix());
    }
}

export const medCheckXrayRoute: Routes = [
    {
        path: 'med-check-xray-my-suffix',
        component: MedCheckXrayMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'MedCheckXrays'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'med-check-xray-my-suffix/:id/view',
        component: MedCheckXrayMySuffixDetailComponent,
        resolve: {
            medCheckXray: MedCheckXrayMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'MedCheckXrays'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'med-check-xray-my-suffix/new',
        component: MedCheckXrayMySuffixUpdateComponent,
        resolve: {
            medCheckXray: MedCheckXrayMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'MedCheckXrays'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'med-check-xray-my-suffix/:id/edit',
        component: MedCheckXrayMySuffixUpdateComponent,
        resolve: {
            medCheckXray: MedCheckXrayMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'MedCheckXrays'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const medCheckXrayPopupRoute: Routes = [
    {
        path: 'med-check-xray-my-suffix/:id/delete',
        component: MedCheckXrayMySuffixDeletePopupComponent,
        resolve: {
            medCheckXray: MedCheckXrayMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'MedCheckXrays'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
