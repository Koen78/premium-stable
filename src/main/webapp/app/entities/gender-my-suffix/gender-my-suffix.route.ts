import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { GenderMySuffix } from 'app/shared/model/gender-my-suffix.model';
import { GenderMySuffixService } from './gender-my-suffix.service';
import { GenderMySuffixComponent } from './gender-my-suffix.component';
import { GenderMySuffixDetailComponent } from './gender-my-suffix-detail.component';
import { GenderMySuffixUpdateComponent } from './gender-my-suffix-update.component';
import { GenderMySuffixDeletePopupComponent } from './gender-my-suffix-delete-dialog.component';
import { IGenderMySuffix } from 'app/shared/model/gender-my-suffix.model';

@Injectable({ providedIn: 'root' })
export class GenderMySuffixResolve implements Resolve<IGenderMySuffix> {
    constructor(private service: GenderMySuffixService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<GenderMySuffix> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<GenderMySuffix>) => response.ok),
                map((gender: HttpResponse<GenderMySuffix>) => gender.body)
            );
        }
        return of(new GenderMySuffix());
    }
}

export const genderRoute: Routes = [
    {
        path: 'gender-my-suffix',
        component: GenderMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Genders'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'gender-my-suffix/:id/view',
        component: GenderMySuffixDetailComponent,
        resolve: {
            gender: GenderMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Genders'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'gender-my-suffix/new',
        component: GenderMySuffixUpdateComponent,
        resolve: {
            gender: GenderMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Genders'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'gender-my-suffix/:id/edit',
        component: GenderMySuffixUpdateComponent,
        resolve: {
            gender: GenderMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Genders'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const genderPopupRoute: Routes = [
    {
        path: 'gender-my-suffix/:id/delete',
        component: GenderMySuffixDeletePopupComponent,
        resolve: {
            gender: GenderMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Genders'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
