import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { LevelJumpingHisMySuffix } from 'app/shared/model/level-jumping-his-my-suffix.model';
import { LevelJumpingHisMySuffixService } from './level-jumping-his-my-suffix.service';
import { LevelJumpingHisMySuffixComponent } from './level-jumping-his-my-suffix.component';
import { LevelJumpingHisMySuffixDetailComponent } from './level-jumping-his-my-suffix-detail.component';
import { LevelJumpingHisMySuffixUpdateComponent } from './level-jumping-his-my-suffix-update.component';
import { LevelJumpingHisMySuffixDeletePopupComponent } from './level-jumping-his-my-suffix-delete-dialog.component';
import { ILevelJumpingHisMySuffix } from 'app/shared/model/level-jumping-his-my-suffix.model';

@Injectable({ providedIn: 'root' })
export class LevelJumpingHisMySuffixResolve implements Resolve<ILevelJumpingHisMySuffix> {
    constructor(private service: LevelJumpingHisMySuffixService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<LevelJumpingHisMySuffix> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<LevelJumpingHisMySuffix>) => response.ok),
                map((levelJumpingHis: HttpResponse<LevelJumpingHisMySuffix>) => levelJumpingHis.body)
            );
        }
        return of(new LevelJumpingHisMySuffix());
    }
}

export const levelJumpingHisRoute: Routes = [
    {
        path: 'level-jumping-his-my-suffix',
        component: LevelJumpingHisMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'LevelJumpingHis'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'level-jumping-his-my-suffix/:id/view',
        component: LevelJumpingHisMySuffixDetailComponent,
        resolve: {
            levelJumpingHis: LevelJumpingHisMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'LevelJumpingHis'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'level-jumping-his-my-suffix/new',
        component: LevelJumpingHisMySuffixUpdateComponent,
        resolve: {
            levelJumpingHis: LevelJumpingHisMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'LevelJumpingHis'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'level-jumping-his-my-suffix/:id/edit',
        component: LevelJumpingHisMySuffixUpdateComponent,
        resolve: {
            levelJumpingHis: LevelJumpingHisMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'LevelJumpingHis'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const levelJumpingHisPopupRoute: Routes = [
    {
        path: 'level-jumping-his-my-suffix/:id/delete',
        component: LevelJumpingHisMySuffixDeletePopupComponent,
        resolve: {
            levelJumpingHis: LevelJumpingHisMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'LevelJumpingHis'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
