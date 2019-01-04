import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { LevelDressageMySuffix } from 'app/shared/model/level-dressage-my-suffix.model';
import { LevelDressageMySuffixService } from './level-dressage-my-suffix.service';
import { LevelDressageMySuffixComponent } from './level-dressage-my-suffix.component';
import { LevelDressageMySuffixDetailComponent } from './level-dressage-my-suffix-detail.component';
import { LevelDressageMySuffixUpdateComponent } from './level-dressage-my-suffix-update.component';
import { LevelDressageMySuffixDeletePopupComponent } from './level-dressage-my-suffix-delete-dialog.component';
import { ILevelDressageMySuffix } from 'app/shared/model/level-dressage-my-suffix.model';

@Injectable({ providedIn: 'root' })
export class LevelDressageMySuffixResolve implements Resolve<ILevelDressageMySuffix> {
    constructor(private service: LevelDressageMySuffixService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<LevelDressageMySuffix> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<LevelDressageMySuffix>) => response.ok),
                map((levelDressage: HttpResponse<LevelDressageMySuffix>) => levelDressage.body)
            );
        }
        return of(new LevelDressageMySuffix());
    }
}

export const levelDressageRoute: Routes = [
    {
        path: 'level-dressage-my-suffix',
        component: LevelDressageMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'LevelDressages'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'level-dressage-my-suffix/:id/view',
        component: LevelDressageMySuffixDetailComponent,
        resolve: {
            levelDressage: LevelDressageMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'LevelDressages'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'level-dressage-my-suffix/new',
        component: LevelDressageMySuffixUpdateComponent,
        resolve: {
            levelDressage: LevelDressageMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'LevelDressages'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'level-dressage-my-suffix/:id/edit',
        component: LevelDressageMySuffixUpdateComponent,
        resolve: {
            levelDressage: LevelDressageMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'LevelDressages'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const levelDressagePopupRoute: Routes = [
    {
        path: 'level-dressage-my-suffix/:id/delete',
        component: LevelDressageMySuffixDeletePopupComponent,
        resolve: {
            levelDressage: LevelDressageMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'LevelDressages'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
