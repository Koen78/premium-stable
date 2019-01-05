import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IRaceMySuffix } from 'app/shared/model/race-my-suffix.model';

type EntityResponseType = HttpResponse<IRaceMySuffix>;
type EntityArrayResponseType = HttpResponse<IRaceMySuffix[]>;

@Injectable({ providedIn: 'root' })
export class RaceMySuffixService {
    public resourceUrl = SERVER_API_URL + 'api/races';
    public resourceSearchUrl = SERVER_API_URL + 'api/_search/races';

    constructor(protected http: HttpClient) {}

    create(race: IRaceMySuffix): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(race);
        return this.http
            .post<IRaceMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(race: IRaceMySuffix): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(race);
        return this.http
            .put<IRaceMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IRaceMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IRaceMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IRaceMySuffix[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    protected convertDateFromClient(race: IRaceMySuffix): IRaceMySuffix {
        const copy: IRaceMySuffix = Object.assign({}, race, {
            date: race.date != null && race.date.isValid() ? race.date.format(DATE_FORMAT) : null
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
            res.body.forEach((race: IRaceMySuffix) => {
                race.date = race.date != null ? moment(race.date) : null;
            });
        }
        return res;
    }
}
