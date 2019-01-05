import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IVideoMySuffix } from 'app/shared/model/video-my-suffix.model';

type EntityResponseType = HttpResponse<IVideoMySuffix>;
type EntityArrayResponseType = HttpResponse<IVideoMySuffix[]>;

@Injectable({ providedIn: 'root' })
export class VideoMySuffixService {
    public resourceUrl = SERVER_API_URL + 'api/videos';
    public resourceSearchUrl = SERVER_API_URL + 'api/_search/videos';

    constructor(protected http: HttpClient) {}

    create(video: IVideoMySuffix): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(video);
        return this.http
            .post<IVideoMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(video: IVideoMySuffix): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(video);
        return this.http
            .put<IVideoMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IVideoMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IVideoMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IVideoMySuffix[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    protected convertDateFromClient(video: IVideoMySuffix): IVideoMySuffix {
        const copy: IVideoMySuffix = Object.assign({}, video, {
            date: video.date != null && video.date.isValid() ? video.date.format(DATE_FORMAT) : null
        });
        return copy;
    }

    protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
        if (res.body) {
            res.body.date = res.body.date != null ? moment(res.body.date) : null;
        }
        return res;
    }

    protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        if (res.body) {
            res.body.forEach((video: IVideoMySuffix) => {
                video.date = video.date != null ? moment(video.date) : null;
            });
        }
        return res;
    }
}
