import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ILanguageParamMySuffix } from 'app/shared/model/language-param-my-suffix.model';

type EntityResponseType = HttpResponse<ILanguageParamMySuffix>;
type EntityArrayResponseType = HttpResponse<ILanguageParamMySuffix[]>;

@Injectable({ providedIn: 'root' })
export class LanguageParamMySuffixService {
    public resourceUrl = SERVER_API_URL + 'api/language-params';
    public resourceSearchUrl = SERVER_API_URL + 'api/_search/language-params';

    constructor(protected http: HttpClient) {}

    create(languageParam: ILanguageParamMySuffix): Observable<EntityResponseType> {
        return this.http.post<ILanguageParamMySuffix>(this.resourceUrl, languageParam, { observe: 'response' });
    }

    update(languageParam: ILanguageParamMySuffix): Observable<EntityResponseType> {
        return this.http.put<ILanguageParamMySuffix>(this.resourceUrl, languageParam, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ILanguageParamMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ILanguageParamMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ILanguageParamMySuffix[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
    }
}
