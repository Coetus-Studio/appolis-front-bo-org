import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { EventForm } from '../interfaces/events.interface';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  // TODO: verificar como se debe manejar la url del API, ya que por ahora está en duro
  private apiUrl: string = 'http://localhost:3000/v1/events';

  constructor(private http: HttpClient) { }

  // TODO: ver porque da error al dejar el observable como tipo <EventOrgInterface> y dejar funcion como async. implemntar pipe si es necesario
  // async getAllEvents(): Promise<Observable<any>> {
  //   console.log('Service list events');
  //   // return this.http.get(this.apiUrl).pipe(res => res);
  //   return this.http.get<EventOrgInterface>(this.apiUrl);
  // }

  getAllEvents(): Observable<EventForm[]> {
    console.log('Service list events');

    return this.http.get<EventForm[]>(this.apiUrl)
      .pipe(map(res => res))
  }

  createEvent(body: EventForm): Observable<any> {
    console.log('Service create event', body);
    return this.http.post<EventForm[]>(this.apiUrl, body).pipe(map(res => res))
  }

}
