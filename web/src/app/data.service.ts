import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Configuration } from './app.configuration';

const _HttpOptions = {
    _HttpHeaders: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class DataService {
    private _UrlServer: string;
    private _UrlApi: string;

    constructor(
        private pHttpClient: HttpClient,
        private pConfiguration: Configuration
    ) {
        this._UrlServer = '';
        this._UrlApi = '';
        this._UrlServer = pConfiguration.UrlServer;
        this._UrlApi = pConfiguration.UrlApi;
    }

    public fnGetAll<T>(pMethod: string): Observable<T> {
        return this.pHttpClient.get<T>(this._UrlServer + this._UrlApi + pMethod);
    }

    public fnGetSingle<T>(pMethod: string, pId: number): Observable<T> {
        return this.pHttpClient.get<T>(this._UrlServer + this._UrlApi + pMethod + pId);
    }

    public doAdd<T>(pMethod: string, pItem: string): Observable<T> {
        const toAdd = JSON.stringify({ ItemName: pItem });

        return this.pHttpClient.post<T>(this._UrlServer + this._UrlApi + pMethod, toAdd);
    }

    public doUpdate<T>(pMethod: string, pId: number, pItem: any): Observable<T> {
        return this.pHttpClient.put<T>(this._UrlServer + this._UrlApi + pMethod + pId, JSON.stringify(pItem));
    }

    public doDelete<T>(pMethod: string, pId: number): Observable<T> {
        return this.pHttpClient.delete<T>(this._UrlServer + this._UrlApi + pMethod + pId);
    }
}
