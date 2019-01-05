import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IMedCheckDetMySuffix } from 'app/shared/model/med-check-det-my-suffix.model';

type EntityResponseType = HttpResponse<IMedCheckDetMySuffix>;
type EntityArrayResponseType = HttpResponse<IMedCheckDetMySuffix[]>;

@Injectable({ providedIn: 'root' })
export class MedCheckDetMySuffixService {
    public resourceUrl = SERVER_API_URL + 'api/med-check-dets';
    public resourceSearchUrl = SERVER_API_URL + 'api/_search/med-check-dets';

    constructor(protected http: HttpClient) {}

    create(medCheckDet: IMedCheckDetMySuffix): Observable<EntityResponseType> {
        return this.http.post<IMedCheckDetMySuffix>(this.resourceUrl, medCheckDet, { observe: 'response' });
    }

    update(medCheckDet: IMedCheckDetMySuffix): Observable<EntityResponseType> {
        return this.http.put<IMedCheckDetMySuffix>(this.resourceUrl, medCheckDet, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IMedCheckDetMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IMedCheckDetMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IMedCheckDetMySuffix[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
    }
}
