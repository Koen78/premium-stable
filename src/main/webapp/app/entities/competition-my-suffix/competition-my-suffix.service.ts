import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ICompetitionMySuffix } from 'app/shared/model/competition-my-suffix.model';

type EntityResponseType = HttpResponse<ICompetitionMySuffix>;
type EntityArrayResponseType = HttpResponse<ICompetitionMySuffix[]>;

@Injectable({ providedIn: 'root' })
export class CompetitionMySuffixService {
    public resourceUrl = SERVER_API_URL + 'api/competitions';
    public resourceSearchUrl = SERVER_API_URL + 'api/_search/competitions';

    constructor(protected http: HttpClient) {}

    create(competition: ICompetitionMySuffix): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(competition);
        return this.http
            .post<ICompetitionMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(competition: ICompetitionMySuffix): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(competition);
        return this.http
            .put<ICompetitionMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<ICompetitionMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<ICompetitionMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<ICompetitionMySuffix[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    protected convertDateFromClient(competition: ICompetitionMySuffix): ICompetitionMySuffix {
        const copy: ICompetitionMySuffix = Object.assign({}, competition, {
            date: competition.date != null && competition.date.isValid() ? competition.date.format(DATE_FORMAT) : null
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
            res.body.forEach((competition: ICompetitionMySuffix) => {
                competition.date = competition.date != null ? moment(competition.date) : null;
            });
        }
        return res;
    }
}
