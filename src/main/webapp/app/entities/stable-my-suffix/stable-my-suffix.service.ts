import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IStableMySuffix } from 'app/shared/model/stable-my-suffix.model';

type EntityResponseType = HttpResponse<IStableMySuffix>;
type EntityArrayResponseType = HttpResponse<IStableMySuffix[]>;

@Injectable({ providedIn: 'root' })
export class StableMySuffixService {
    public resourceUrl = SERVER_API_URL + 'api/stables';
    public resourceSearchUrl = SERVER_API_URL + 'api/_search/stables';

    constructor(protected http: HttpClient) {}

    create(stable: IStableMySuffix): Observable<EntityResponseType> {
        return this.http.post<IStableMySuffix>(this.resourceUrl, stable, { observe: 'response' });
    }

    update(stable: IStableMySuffix): Observable<EntityResponseType> {
        return this.http.put<IStableMySuffix>(this.resourceUrl, stable, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IStableMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IStableMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IStableMySuffix[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
    }
}
