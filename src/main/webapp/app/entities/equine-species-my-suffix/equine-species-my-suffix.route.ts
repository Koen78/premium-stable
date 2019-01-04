import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { EquineSpeciesMySuffix } from 'app/shared/model/equine-species-my-suffix.model';
import { EquineSpeciesMySuffixService } from './equine-species-my-suffix.service';
import { EquineSpeciesMySuffixComponent } from './equine-species-my-suffix.component';
import { EquineSpeciesMySuffixDetailComponent } from './equine-species-my-suffix-detail.component';
import { EquineSpeciesMySuffixUpdateComponent } from './equine-species-my-suffix-update.component';
import { EquineSpeciesMySuffixDeletePopupComponent } from './equine-species-my-suffix-delete-dialog.component';
import { IEquineSpeciesMySuffix } from 'app/shared/model/equine-species-my-suffix.model';

@Injectable({ providedIn: 'root' })
export class EquineSpeciesMySuffixResolve implements Resolve<IEquineSpeciesMySuffix> {
    constructor(private service: EquineSpeciesMySuffixService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<EquineSpeciesMySuffix> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<EquineSpeciesMySuffix>) => response.ok),
                map((equineSpecies: HttpResponse<EquineSpeciesMySuffix>) => equineSpecies.body)
            );
        }
        return of(new EquineSpeciesMySuffix());
    }
}

export const equineSpeciesRoute: Routes = [
    {
        path: 'equine-species-my-suffix',
        component: EquineSpeciesMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'EquineSpecies'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'equine-species-my-suffix/:id/view',
        component: EquineSpeciesMySuffixDetailComponent,
        resolve: {
            equineSpecies: EquineSpeciesMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'EquineSpecies'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'equine-species-my-suffix/new',
        component: EquineSpeciesMySuffixUpdateComponent,
        resolve: {
            equineSpecies: EquineSpeciesMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'EquineSpecies'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'equine-species-my-suffix/:id/edit',
        component: EquineSpeciesMySuffixUpdateComponent,
        resolve: {
            equineSpecies: EquineSpeciesMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'EquineSpecies'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const equineSpeciesPopupRoute: Routes = [
    {
        path: 'equine-species-my-suffix/:id/delete',
        component: EquineSpeciesMySuffixDeletePopupComponent,
        resolve: {
            equineSpecies: EquineSpeciesMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'EquineSpecies'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
