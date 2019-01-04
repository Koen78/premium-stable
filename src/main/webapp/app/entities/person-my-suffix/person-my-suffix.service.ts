import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IPersonMySuffix } from 'app/shared/model/person-my-suffix.model';

type EntityResponseType = HttpResponse<IPersonMySuffix>;
type EntityArrayResponseType = HttpResponse<IPersonMySuffix[]>;

@Injectable({ providedIn: 'root' })
export class PersonMySuffixService {
    public resourceUrl = SERVER_API_URL + 'api/people';
    public resourceSearchUrl = SERVER_API_URL + 'api/_search/people';

    constructor(protected http: HttpClient) {}

    create(person: IPersonMySuffix): Observable<EntityResponseType> {
        return this.http.post<IPersonMySuffix>(this.resourceUrl, person, { observe: 'response' });
    }

    update(person: IPersonMySuffix): Observable<EntityResponseType> {
        return this.http.put<IPersonMySuffix>(this.resourceUrl, person, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IPersonMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IPersonMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IPersonMySuffix[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
    }
}
