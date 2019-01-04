import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ILevelJumpingMySuffix } from 'app/shared/model/level-jumping-my-suffix.model';

type EntityResponseType = HttpResponse<ILevelJumpingMySuffix>;
type EntityArrayResponseType = HttpResponse<ILevelJumpingMySuffix[]>;

@Injectable({ providedIn: 'root' })
export class LevelJumpingMySuffixService {
    public resourceUrl = SERVER_API_URL + 'api/level-jumpings';
    public resourceSearchUrl = SERVER_API_URL + 'api/_search/level-jumpings';

    constructor(protected http: HttpClient) {}

    create(levelJumping: ILevelJumpingMySuffix): Observable<EntityResponseType> {
        return this.http.post<ILevelJumpingMySuffix>(this.resourceUrl, levelJumping, { observe: 'response' });
    }

    update(levelJumping: ILevelJumpingMySuffix): Observable<EntityResponseType> {
        return this.http.put<ILevelJumpingMySuffix>(this.resourceUrl, levelJumping, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ILevelJumpingMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ILevelJumpingMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ILevelJumpingMySuffix[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
    }
}
