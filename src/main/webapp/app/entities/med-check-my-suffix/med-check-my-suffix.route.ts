import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { MedCheckMySuffix } from 'app/shared/model/med-check-my-suffix.model';
import { MedCheckMySuffixService } from './med-check-my-suffix.service';
import { MedCheckMySuffixComponent } from './med-check-my-suffix.component';
import { MedCheckMySuffixDetailComponent } from './med-check-my-suffix-detail.component';
import { MedCheckMySuffixUpdateComponent } from './med-check-my-suffix-update.component';
import { MedCheckMySuffixDeletePopupComponent } from './med-check-my-suffix-delete-dialog.component';
import { IMedCheckMySuffix } from 'app/shared/model/med-check-my-suffix.model';

@Injectable({ providedIn: 'root' })
export class MedCheckMySuffixResolve implements Resolve<IMedCheckMySuffix> {
    constructor(private service: MedCheckMySuffixService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<MedCheckMySuffix> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<MedCheckMySuffix>) => response.ok),
                map((medCheck: HttpResponse<MedCheckMySuffix>) => medCheck.body)
            );
        }
        return of(new MedCheckMySuffix());
    }
}

export const medCheckRoute: Routes = [
    {
        path: 'med-check-my-suffix',
        component: MedCheckMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'MedChecks'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'med-check-my-suffix/:id/view',
        component: MedCheckMySuffixDetailComponent,
        resolve: {
            medCheck: MedCheckMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'MedChecks'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'med-check-my-suffix/new',
        component: MedCheckMySuffixUpdateComponent,
        resolve: {
            medCheck: MedCheckMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'MedChecks'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'med-check-my-suffix/:id/edit',
        component: MedCheckMySuffixUpdateComponent,
        resolve: {
            medCheck: MedCheckMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'MedChecks'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const medCheckPopupRoute: Routes = [
    {
        path: 'med-check-my-suffix/:id/delete',
        component: MedCheckMySuffixDeletePopupComponent,
        resolve: {
            medCheck: MedCheckMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'MedChecks'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
