import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { PictureMySuffix } from 'app/shared/model/picture-my-suffix.model';
import { PictureMySuffixService } from './picture-my-suffix.service';
import { PictureMySuffixComponent } from './picture-my-suffix.component';
import { PictureMySuffixDetailComponent } from './picture-my-suffix-detail.component';
import { PictureMySuffixUpdateComponent } from './picture-my-suffix-update.component';
import { PictureMySuffixDeletePopupComponent } from './picture-my-suffix-delete-dialog.component';
import { IPictureMySuffix } from 'app/shared/model/picture-my-suffix.model';

@Injectable({ providedIn: 'root' })
export class PictureMySuffixResolve implements Resolve<IPictureMySuffix> {
    constructor(private service: PictureMySuffixService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<PictureMySuffix> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<PictureMySuffix>) => response.ok),
                map((picture: HttpResponse<PictureMySuffix>) => picture.body)
            );
        }
        return of(new PictureMySuffix());
    }
}

export const pictureRoute: Routes = [
    {
        path: 'picture-my-suffix',
        component: PictureMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Pictures'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'picture-my-suffix/:id/view',
        component: PictureMySuffixDetailComponent,
        resolve: {
            picture: PictureMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Pictures'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'picture-my-suffix/new',
        component: PictureMySuffixUpdateComponent,
        resolve: {
            picture: PictureMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Pictures'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'picture-my-suffix/:id/edit',
        component: PictureMySuffixUpdateComponent,
        resolve: {
            picture: PictureMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Pictures'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const picturePopupRoute: Routes = [
    {
        path: 'picture-my-suffix/:id/delete',
        component: PictureMySuffixDeletePopupComponent,
        resolve: {
            picture: PictureMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Pictures'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
