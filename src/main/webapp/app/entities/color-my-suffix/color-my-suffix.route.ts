import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ColorMySuffix } from 'app/shared/model/color-my-suffix.model';
import { ColorMySuffixService } from './color-my-suffix.service';
import { ColorMySuffixComponent } from './color-my-suffix.component';
import { ColorMySuffixDetailComponent } from './color-my-suffix-detail.component';
import { ColorMySuffixUpdateComponent } from './color-my-suffix-update.component';
import { ColorMySuffixDeletePopupComponent } from './color-my-suffix-delete-dialog.component';
import { IColorMySuffix } from 'app/shared/model/color-my-suffix.model';

@Injectable({ providedIn: 'root' })
export class ColorMySuffixResolve implements Resolve<IColorMySuffix> {
    constructor(private service: ColorMySuffixService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ColorMySuffix> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<ColorMySuffix>) => response.ok),
                map((color: HttpResponse<ColorMySuffix>) => color.body)
            );
        }
        return of(new ColorMySuffix());
    }
}

export const colorRoute: Routes = [
    {
        path: 'color-my-suffix',
        component: ColorMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Colors'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'color-my-suffix/:id/view',
        component: ColorMySuffixDetailComponent,
        resolve: {
            color: ColorMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Colors'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'color-my-suffix/new',
        component: ColorMySuffixUpdateComponent,
        resolve: {
            color: ColorMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Colors'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'color-my-suffix/:id/edit',
        component: ColorMySuffixUpdateComponent,
        resolve: {
            color: ColorMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Colors'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const colorPopupRoute: Routes = [
    {
        path: 'color-my-suffix/:id/delete',
        component: ColorMySuffixDeletePopupComponent,
        resolve: {
            color: ColorMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Colors'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
