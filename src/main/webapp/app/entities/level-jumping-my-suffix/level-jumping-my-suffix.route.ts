import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { LevelJumpingMySuffix } from 'app/shared/model/level-jumping-my-suffix.model';
import { LevelJumpingMySuffixService } from './level-jumping-my-suffix.service';
import { LevelJumpingMySuffixComponent } from './level-jumping-my-suffix.component';
import { LevelJumpingMySuffixDetailComponent } from './level-jumping-my-suffix-detail.component';
import { LevelJumpingMySuffixUpdateComponent } from './level-jumping-my-suffix-update.component';
import { LevelJumpingMySuffixDeletePopupComponent } from './level-jumping-my-suffix-delete-dialog.component';
import { ILevelJumpingMySuffix } from 'app/shared/model/level-jumping-my-suffix.model';

@Injectable({ providedIn: 'root' })
export class LevelJumpingMySuffixResolve implements Resolve<ILevelJumpingMySuffix> {
    constructor(private service: LevelJumpingMySuffixService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<LevelJumpingMySuffix> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<LevelJumpingMySuffix>) => response.ok),
                map((levelJumping: HttpResponse<LevelJumpingMySuffix>) => levelJumping.body)
            );
        }
        return of(new LevelJumpingMySuffix());
    }
}

export const levelJumpingRoute: Routes = [
    {
        path: 'level-jumping-my-suffix',
        component: LevelJumpingMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'LevelJumpings'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'level-jumping-my-suffix/:id/view',
        component: LevelJumpingMySuffixDetailComponent,
        resolve: {
            levelJumping: LevelJumpingMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'LevelJumpings'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'level-jumping-my-suffix/new',
        component: LevelJumpingMySuffixUpdateComponent,
        resolve: {
            levelJumping: LevelJumpingMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'LevelJumpings'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'level-jumping-my-suffix/:id/edit',
        component: LevelJumpingMySuffixUpdateComponent,
        resolve: {
            levelJumping: LevelJumpingMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'LevelJumpings'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const levelJumpingPopupRoute: Routes = [
    {
        path: 'level-jumping-my-suffix/:id/delete',
        component: LevelJumpingMySuffixDeletePopupComponent,
        resolve: {
            levelJumping: LevelJumpingMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'LevelJumpings'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
