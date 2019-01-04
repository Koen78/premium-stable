import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { LanguageParamMySuffix } from 'app/shared/model/language-param-my-suffix.model';
import { LanguageParamMySuffixService } from './language-param-my-suffix.service';
import { LanguageParamMySuffixComponent } from './language-param-my-suffix.component';
import { LanguageParamMySuffixDetailComponent } from './language-param-my-suffix-detail.component';
import { LanguageParamMySuffixUpdateComponent } from './language-param-my-suffix-update.component';
import { LanguageParamMySuffixDeletePopupComponent } from './language-param-my-suffix-delete-dialog.component';
import { ILanguageParamMySuffix } from 'app/shared/model/language-param-my-suffix.model';

@Injectable({ providedIn: 'root' })
export class LanguageParamMySuffixResolve implements Resolve<ILanguageParamMySuffix> {
    constructor(private service: LanguageParamMySuffixService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<LanguageParamMySuffix> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<LanguageParamMySuffix>) => response.ok),
                map((languageParam: HttpResponse<LanguageParamMySuffix>) => languageParam.body)
            );
        }
        return of(new LanguageParamMySuffix());
    }
}

export const languageParamRoute: Routes = [
    {
        path: 'language-param-my-suffix',
        component: LanguageParamMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'LanguageParams'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'language-param-my-suffix/:id/view',
        component: LanguageParamMySuffixDetailComponent,
        resolve: {
            languageParam: LanguageParamMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'LanguageParams'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'language-param-my-suffix/new',
        component: LanguageParamMySuffixUpdateComponent,
        resolve: {
            languageParam: LanguageParamMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'LanguageParams'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'language-param-my-suffix/:id/edit',
        component: LanguageParamMySuffixUpdateComponent,
        resolve: {
            languageParam: LanguageParamMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'LanguageParams'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const languageParamPopupRoute: Routes = [
    {
        path: 'language-param-my-suffix/:id/delete',
        component: LanguageParamMySuffixDeletePopupComponent,
        resolve: {
            languageParam: LanguageParamMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'LanguageParams'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
