import { BaseApi } from '../../../shared/core/base-api';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AppEvent } from '../models/event.model';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class EventsService extends BaseApi{
    constructor(public http: HttpClient) {
        super(http);
    }

    addEvent(event: AppEvent): Observable<AppEvent> {
        return this.post('events', event);
    }

    getEvents(): Observable<AppEvent[]> {
        return this.get('events')
    }

    getEventById (id: string): Observable<AppEvent> {
        return this.get(`events/${id}`);
    }
}
