import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { VideoMySuffix } from 'app/shared/model/video-my-suffix.model';
import { VideoMySuffixService } from './video-my-suffix.service';
import { VideoMySuffixComponent } from './video-my-suffix.component';
import { VideoMySuffixDetailComponent } from './video-my-suffix-detail.component';
import { VideoMySuffixUpdateComponent } from './video-my-suffix-update.component';
import { VideoMySuffixDeletePopupComponent } from './video-my-suffix-delete-dialog.component';
import { IVideoMySuffix } from 'app/shared/model/video-my-suffix.model';

@Injectable({ providedIn: 'root' })
export class VideoMySuffixResolve implements Resolve<IVideoMySuffix> {
    constructor(private service: VideoMySuffixService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<VideoMySuffix> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<VideoMySuffix>) => response.ok),
                map((video: HttpResponse<VideoMySuffix>) => video.body)
            );
        }
        return of(new VideoMySuffix());
    }
}

export const videoRoute: Routes = [
    {
        path: 'video-my-suffix',
        component: VideoMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Videos'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'video-my-suffix/:id/view',
        component: VideoMySuffixDetailComponent,
        resolve: {
            video: VideoMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Videos'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'video-my-suffix/new',
        component: VideoMySuffixUpdateComponent,
        resolve: {
            video: VideoMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Videos'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'video-my-suffix/:id/edit',
        component: VideoMySuffixUpdateComponent,
        resolve: {
            video: VideoMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Videos'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const videoPopupRoute: Routes = [
    {
        path: 'video-my-suffix/:id/delete',
        component: VideoMySuffixDeletePopupComponent,
        resolve: {
            video: VideoMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Videos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
