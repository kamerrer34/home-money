import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { ApiService } from "./api.service";
import { AppEvent } from "../models/event.model";

@Injectable({
  providedIn: 'root'
})
export class EventsService extends ApiService {
  constructor(public override http: HttpClient) {
    super(http)
  }

  addEvent(event: AppEvent): Observable<AppEvent> {
    return this.post('events', event);
  }

  getEvents(): Observable<AppEvent[]> {
    return this.get('events');
  }

  getEventById(id: string): Observable<AppEvent> {
    return this.get(`events/${id}`);
  }
}
