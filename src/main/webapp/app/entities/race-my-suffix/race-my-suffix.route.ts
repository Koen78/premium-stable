import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { RaceMySuffix } from 'app/shared/model/race-my-suffix.model';
import { RaceMySuffixService } from './race-my-suffix.service';
import { RaceMySuffixComponent } from './race-my-suffix.component';
import { RaceMySuffixDetailComponent } from './race-my-suffix-detail.component';
import { RaceMySuffixUpdateComponent } from './race-my-suffix-update.component';
import { RaceMySuffixDeletePopupComponent } from './race-my-suffix-delete-dialog.component';
import { IRaceMySuffix } from 'app/shared/model/race-my-suffix.model';

@Injectable({ providedIn: 'root' })
export class RaceMySuffixResolve implements Resolve<IRaceMySuffix> {
    constructor(private service: RaceMySuffixService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<RaceMySuffix> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<RaceMySuffix>) => response.ok),
                map((race: HttpResponse<RaceMySuffix>) => race.body)
            );
        }
        return of(new RaceMySuffix());
    }
}

export const raceRoute: Routes = [
    {
        path: 'race-my-suffix',
        component: RaceMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Races'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'race-my-suffix/:id/view',
        component: RaceMySuffixDetailComponent,
        resolve: {
            race: RaceMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Races'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'race-my-suffix/new',
        component: RaceMySuffixUpdateComponent,
        resolve: {
            race: RaceMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Races'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'race-my-suffix/:id/edit',
        component: RaceMySuffixUpdateComponent,
        resolve: {
            race: RaceMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Races'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const racePopupRoute: Routes = [
    {
        path: 'race-my-suffix/:id/delete',
        component: RaceMySuffixDeletePopupComponent,
        resolve: {
            race: RaceMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Races'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
