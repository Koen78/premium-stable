import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IEquineSpeciesMySuffix } from 'app/shared/model/equine-species-my-suffix.model';

type EntityResponseType = HttpResponse<IEquineSpeciesMySuffix>;
type EntityArrayResponseType = HttpResponse<IEquineSpeciesMySuffix[]>;

@Injectable({ providedIn: 'root' })
export class EquineSpeciesMySuffixService {
    public resourceUrl = SERVER_API_URL + 'api/equine-species';
    public resourceSearchUrl = SERVER_API_URL + 'api/_search/equine-species';

    constructor(protected http: HttpClient) {}

    create(equineSpecies: IEquineSpeciesMySuffix): Observable<EntityResponseType> {
        return this.http.post<IEquineSpeciesMySuffix>(this.resourceUrl, equineSpecies, { observe: 'response' });
    }

    update(equineSpecies: IEquineSpeciesMySuffix): Observable<EntityResponseType> {
        return this.http.put<IEquineSpeciesMySuffix>(this.resourceUrl, equineSpecies, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IEquineSpeciesMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IEquineSpeciesMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IEquineSpeciesMySuffix[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
    }
}
