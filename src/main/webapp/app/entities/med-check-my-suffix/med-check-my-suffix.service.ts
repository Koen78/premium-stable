import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IMedCheckMySuffix } from 'app/shared/model/med-check-my-suffix.model';

type EntityResponseType = HttpResponse<IMedCheckMySuffix>;
type EntityArrayResponseType = HttpResponse<IMedCheckMySuffix[]>;

@Injectable({ providedIn: 'root' })
export class MedCheckMySuffixService {
    public resourceUrl = SERVER_API_URL + 'api/med-checks';
    public resourceSearchUrl = SERVER_API_URL + 'api/_search/med-checks';

    constructor(protected http: HttpClient) {}

    create(medCheck: IMedCheckMySuffix): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(medCheck);
        return this.http
            .post<IMedCheckMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(medCheck: IMedCheckMySuffix): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(medCheck);
        return this.http
            .put<IMedCheckMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IMedCheckMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IMedCheckMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IMedCheckMySuffix[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    protected convertDateFromClient(medCheck: IMedCheckMySuffix): IMedCheckMySuffix {
        const copy: IMedCheckMySuffix = Object.assign({}, medCheck, {
            date: medCheck.date != null && medCheck.date.isValid() ? medCheck.date.format(DATE_FORMAT) : null
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
            res.body.forEach((medCheck: IMedCheckMySuffix) => {
                medCheck.date = medCheck.date != null ? moment(medCheck.date) : null;
            });
        }
        return res;
    }
}
