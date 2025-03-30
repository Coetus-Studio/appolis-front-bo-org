import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { filter, map, Observable, switchMap } from 'rxjs';
import { EventForm } from '../interfaces/events.interface';
import { StorageService } from '../../../storage.service';
import { AuthService } from '../../../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private authToken: string | undefined | null = '';

  private readonly apiUrl: string = 'http://localhost:3000/v1/events';

  constructor(
    private http: HttpClient,
    private authService: AuthService,
  ) {
  }

  getAllEvents(): Observable<EventForm[]> {

    console.log('getAllEvents')
    return this.authService.getToken().pipe(
      filter(token => !!token), // Espera a que el token esté disponible
      switchMap(token => {
        const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
        return this.http.get<EventForm[]>(this.apiUrl, {
          headers });
      })
    );
  }

  createEvent(body: EventForm): Observable<any> {
    // const headers = {
    //   Authorization: `Bearer ${this.authToken}`,
    //   'Content-Type': 'application/json'
    // }

    console.log('body', body);

    return this.authService.getToken().pipe(
      filter(token =>!!token), // Espera a que el token esté disponible
      switchMap(token => {
        const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
        return this.http.post<EventForm[]>(this.apiUrl, body, { headers });
      })
    )
/*
    console.log('createEvent.json', this.authToken);
    console.log('Service create event', body);
    return this.http.post<EventForm[]>(this.apiUrl, body, {headers}).pipe(map(res => res)) */
  }
}
