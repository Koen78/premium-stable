import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IMedCheckXrayMySuffix } from 'app/shared/model/med-check-xray-my-suffix.model';

type EntityResponseType = HttpResponse<IMedCheckXrayMySuffix>;
type EntityArrayResponseType = HttpResponse<IMedCheckXrayMySuffix[]>;

@Injectable({ providedIn: 'root' })
export class MedCheckXrayMySuffixService {
    public resourceUrl = SERVER_API_URL + 'api/med-check-xrays';
    public resourceSearchUrl = SERVER_API_URL + 'api/_search/med-check-xrays';

    constructor(protected http: HttpClient) {}

    create(medCheckXray: IMedCheckXrayMySuffix): Observable<EntityResponseType> {
        return this.http.post<IMedCheckXrayMySuffix>(this.resourceUrl, medCheckXray, { observe: 'response' });
    }

    update(medCheckXray: IMedCheckXrayMySuffix): Observable<EntityResponseType> {
        return this.http.put<IMedCheckXrayMySuffix>(this.resourceUrl, medCheckXray, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IMedCheckXrayMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IMedCheckXrayMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IMedCheckXrayMySuffix[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
    }
}
