import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Bill } from '../models/bill.model';
import { Response } from '@angular/http';
import { BaseApi } from '../../../shared/core/base-api';
import { HttpClient } from '@angular/common/http';
import { Http } from '@angular/http';

@Injectable()
export class BillService extends BaseApi {
    constructor(public http: HttpClient) {
        super (http);
    }

    getBill(): Observable<Bill> {
        return this.get('bill');
    }

    updateBill(bill: Bill): Observable<Bill> {
        return this.put('bill', bill);
    }

    getCurrency(base: string = 'RUB'): Observable<any> {
        return this.http.get(`https://api.fixer.io/latest?base=${base}`);
    }
}
