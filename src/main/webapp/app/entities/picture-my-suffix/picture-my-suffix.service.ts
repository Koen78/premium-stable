import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IPictureMySuffix } from 'app/shared/model/picture-my-suffix.model';

type EntityResponseType = HttpResponse<IPictureMySuffix>;
type EntityArrayResponseType = HttpResponse<IPictureMySuffix[]>;

@Injectable({ providedIn: 'root' })
export class PictureMySuffixService {
    public resourceUrl = SERVER_API_URL + 'api/pictures';
    public resourceSearchUrl = SERVER_API_URL + 'api/_search/pictures';

    constructor(protected http: HttpClient) {}

    create(picture: IPictureMySuffix): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(picture);
        return this.http
            .post<IPictureMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(picture: IPictureMySuffix): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(picture);
        return this.http
            .put<IPictureMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IPictureMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IPictureMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IPictureMySuffix[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    protected convertDateFromClient(picture: IPictureMySuffix): IPictureMySuffix {
        const copy: IPictureMySuffix = Object.assign({}, picture, {
            date: picture.date != null && picture.date.isValid() ? picture.date.format(DATE_FORMAT) : null
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
            res.body.forEach((picture: IPictureMySuffix) => {
                picture.date = picture.date != null ? moment(picture.date) : null;
            });
        }
        return res;
    }
}
