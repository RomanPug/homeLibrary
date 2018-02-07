import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class BaseApi {
    baseUrl = 'http://localhost:3000/';
    constructor(public http: HttpClient) {}

    private getUrl(url: String = ''): string {
        return this.baseUrl + url;
    }

    public get(url: String = ''): Observable<any> {
        return this.http.get(this.getUrl(url))
    }

    public post(url: String = '', data: any = {}): Observable<any> {
        return this.http.post(this.getUrl(url), data)
    }

    public put(url: String = '', data: any = {}): Observable<any> {
        return this.http.put(this.getUrl(url), data)
    }
}
