import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { LevelDressageHisMySuffix } from 'app/shared/model/level-dressage-his-my-suffix.model';
import { LevelDressageHisMySuffixService } from './level-dressage-his-my-suffix.service';
import { LevelDressageHisMySuffixComponent } from './level-dressage-his-my-suffix.component';
import { LevelDressageHisMySuffixDetailComponent } from './level-dressage-his-my-suffix-detail.component';
import { LevelDressageHisMySuffixUpdateComponent } from './level-dressage-his-my-suffix-update.component';
import { LevelDressageHisMySuffixDeletePopupComponent } from './level-dressage-his-my-suffix-delete-dialog.component';
import { ILevelDressageHisMySuffix } from 'app/shared/model/level-dressage-his-my-suffix.model';

@Injectable({ providedIn: 'root' })
export class LevelDressageHisMySuffixResolve implements Resolve<ILevelDressageHisMySuffix> {
    constructor(private service: LevelDressageHisMySuffixService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<LevelDressageHisMySuffix> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<LevelDressageHisMySuffix>) => response.ok),
                map((levelDressageHis: HttpResponse<LevelDressageHisMySuffix>) => levelDressageHis.body)
            );
        }
        return of(new LevelDressageHisMySuffix());
    }
}

export const levelDressageHisRoute: Routes = [
    {
        path: 'level-dressage-his-my-suffix',
        component: LevelDressageHisMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'LevelDressageHis'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'level-dressage-his-my-suffix/:id/view',
        component: LevelDressageHisMySuffixDetailComponent,
        resolve: {
            levelDressageHis: LevelDressageHisMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'LevelDressageHis'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'level-dressage-his-my-suffix/new',
        component: LevelDressageHisMySuffixUpdateComponent,
        resolve: {
            levelDressageHis: LevelDressageHisMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'LevelDressageHis'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'level-dressage-his-my-suffix/:id/edit',
        component: LevelDressageHisMySuffixUpdateComponent,
        resolve: {
            levelDressageHis: LevelDressageHisMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'LevelDressageHis'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const levelDressageHisPopupRoute: Routes = [
    {
        path: 'level-dressage-his-my-suffix/:id/delete',
        component: LevelDressageHisMySuffixDeletePopupComponent,
        resolve: {
            levelDressageHis: LevelDressageHisMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'LevelDressageHis'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
