import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { CompetitionMySuffix } from 'app/shared/model/competition-my-suffix.model';
import { CompetitionMySuffixService } from './competition-my-suffix.service';
import { CompetitionMySuffixComponent } from './competition-my-suffix.component';
import { CompetitionMySuffixDetailComponent } from './competition-my-suffix-detail.component';
import { CompetitionMySuffixUpdateComponent } from './competition-my-suffix-update.component';
import { CompetitionMySuffixDeletePopupComponent } from './competition-my-suffix-delete-dialog.component';
import { ICompetitionMySuffix } from 'app/shared/model/competition-my-suffix.model';

@Injectable({ providedIn: 'root' })
export class CompetitionMySuffixResolve implements Resolve<ICompetitionMySuffix> {
    constructor(private service: CompetitionMySuffixService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<CompetitionMySuffix> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<CompetitionMySuffix>) => response.ok),
                map((competition: HttpResponse<CompetitionMySuffix>) => competition.body)
            );
        }
        return of(new CompetitionMySuffix());
    }
}

export const competitionRoute: Routes = [
    {
        path: 'competition-my-suffix',
        component: CompetitionMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Competitions'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'competition-my-suffix/:id/view',
        component: CompetitionMySuffixDetailComponent,
        resolve: {
            competition: CompetitionMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Competitions'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'competition-my-suffix/new',
        component: CompetitionMySuffixUpdateComponent,
        resolve: {
            competition: CompetitionMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Competitions'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'competition-my-suffix/:id/edit',
        component: CompetitionMySuffixUpdateComponent,
        resolve: {
            competition: CompetitionMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Competitions'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const competitionPopupRoute: Routes = [
    {
        path: 'competition-my-suffix/:id/delete',
        component: CompetitionMySuffixDeletePopupComponent,
        resolve: {
            competition: CompetitionMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Competitions'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
