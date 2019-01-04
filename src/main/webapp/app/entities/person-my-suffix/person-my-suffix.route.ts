import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { PersonMySuffix } from 'app/shared/model/person-my-suffix.model';
import { PersonMySuffixService } from './person-my-suffix.service';
import { PersonMySuffixComponent } from './person-my-suffix.component';
import { PersonMySuffixDetailComponent } from './person-my-suffix-detail.component';
import { PersonMySuffixUpdateComponent } from './person-my-suffix-update.component';
import { PersonMySuffixDeletePopupComponent } from './person-my-suffix-delete-dialog.component';
import { IPersonMySuffix } from 'app/shared/model/person-my-suffix.model';

@Injectable({ providedIn: 'root' })
export class PersonMySuffixResolve implements Resolve<IPersonMySuffix> {
    constructor(private service: PersonMySuffixService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<PersonMySuffix> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<PersonMySuffix>) => response.ok),
                map((person: HttpResponse<PersonMySuffix>) => person.body)
            );
        }
        return of(new PersonMySuffix());
    }
}

export const personRoute: Routes = [
    {
        path: 'person-my-suffix',
        component: PersonMySuffixComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'People'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'person-my-suffix/:id/view',
        component: PersonMySuffixDetailComponent,
        resolve: {
            person: PersonMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'People'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'person-my-suffix/new',
        component: PersonMySuffixUpdateComponent,
        resolve: {
            person: PersonMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'People'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'person-my-suffix/:id/edit',
        component: PersonMySuffixUpdateComponent,
        resolve: {
            person: PersonMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'People'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const personPopupRoute: Routes = [
    {
        path: 'person-my-suffix/:id/delete',
        component: PersonMySuffixDeletePopupComponent,
        resolve: {
            person: PersonMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'People'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
