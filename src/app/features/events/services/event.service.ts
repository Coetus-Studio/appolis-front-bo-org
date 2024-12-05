import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { EventForm } from '../interfaces/events.interface';
import { StorageService } from '../../../storage.service';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private authToken: string | undefined | null = '';

  private readonly apiUrl: string = 'http://localhost:3000/v1/events';

  constructor(
    private http: HttpClient,
    private storage: StorageService,
  ) {
    this.initAuthToken();
  }

  // Inicializo authToken
  private async initAuthToken() {
    this.authToken = await this.storage.getItem('authToken');

    if (!this.authToken) {
      console.error('No se encontró el authToken');
    }

    console.log('authToken: ', this.authToken);
  }

  getAllEvents(): Observable<EventForm[]> {
    console.log('Service list events', this.authToken);

    const headers = {
      Authorization: `Bearer ${this.authToken}`,
    }

    return this.http.get<EventForm[]>(this.apiUrl, { headers })
      .pipe(map(res => res))
  }

  createEvent(body: EventForm): Observable<any> {
    console.log('Service create event', body);
    return this.http.post<EventForm[]>(this.apiUrl, body).pipe(map(res => res))
  }

}
