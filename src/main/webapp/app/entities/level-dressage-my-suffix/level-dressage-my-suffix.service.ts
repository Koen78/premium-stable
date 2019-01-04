import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ILevelDressageMySuffix } from 'app/shared/model/level-dressage-my-suffix.model';

type EntityResponseType = HttpResponse<ILevelDressageMySuffix>;
type EntityArrayResponseType = HttpResponse<ILevelDressageMySuffix[]>;

@Injectable({ providedIn: 'root' })
export class LevelDressageMySuffixService {
    public resourceUrl = SERVER_API_URL + 'api/level-dressages';
    public resourceSearchUrl = SERVER_API_URL + 'api/_search/level-dressages';

    constructor(protected http: HttpClient) {}

    create(levelDressage: ILevelDressageMySuffix): Observable<EntityResponseType> {
        return this.http.post<ILevelDressageMySuffix>(this.resourceUrl, levelDressage, { observe: 'response' });
    }

    update(levelDressage: ILevelDressageMySuffix): Observable<EntityResponseType> {
        return this.http.put<ILevelDressageMySuffix>(this.resourceUrl, levelDressage, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ILevelDressageMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ILevelDressageMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ILevelDressageMySuffix[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
    }
}
