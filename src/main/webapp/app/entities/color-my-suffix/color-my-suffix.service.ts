import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IColorMySuffix } from 'app/shared/model/color-my-suffix.model';

type EntityResponseType = HttpResponse<IColorMySuffix>;
type EntityArrayResponseType = HttpResponse<IColorMySuffix[]>;

@Injectable({ providedIn: 'root' })
export class ColorMySuffixService {
    public resourceUrl = SERVER_API_URL + 'api/colors';
    public resourceSearchUrl = SERVER_API_URL + 'api/_search/colors';

    constructor(protected http: HttpClient) {}

    create(color: IColorMySuffix): Observable<EntityResponseType> {
        return this.http.post<IColorMySuffix>(this.resourceUrl, color, { observe: 'response' });
    }

    update(color: IColorMySuffix): Observable<EntityResponseType> {
        return this.http.put<IColorMySuffix>(this.resourceUrl, color, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IColorMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IColorMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IColorMySuffix[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
    }
}
