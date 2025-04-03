import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, OnInit, Signal, signal } from '@angular/core';
import { BehaviorSubject, filter, map, Observable, switchMap } from 'rxjs';
import { EventForm } from '../interfaces/events.interface';
import { StorageService } from '../../../storage.service';
import { AuthService } from '../../../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private authToken: string | undefined | null = '';

  private readonly apiUrl: string = 'http://localhost:3000/v1/events';

  // observable para mantener el estado del evento que se esta actualizando
  private eventData = new BehaviorSubject<EventForm | null>(null);
  event$ = this.eventData.asObservable();

  private isUpdatingSubject = new BehaviorSubject<boolean>(false);
  isUpdating$ = this.isUpdatingSubject.asObservable();

  // almacenamos el id
  private eventId = new BehaviorSubject<string | null>(null);

  // datos guardados para la edicion del mismo
  // TODO dejar any como EventForm, pero sin dejar interface como null o undefined.
  // editedData = signal<any>(null);

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
          headers
        });
      })
    );
  }

  createEvent(body: EventForm): Observable<any> {
    console.log('body', body);

    return this.authService.getToken().pipe(
      filter(token => !!token), // Espera a que el token esté disponible
      switchMap(token => {
        const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
        return this.http.post<EventForm[]>(this.apiUrl, body, { headers });
      })
    )

  }

// TODO: este servicio lo estoy usando en el update y eventDetail, no sobre carga el servicio?
  getEventById(eventId: string): Observable<EventForm> {
    console.log('eventId 4: ' + eventId);

    return this.authService.getToken().pipe(
      filter(token => !!token), // Espera a que el token esté disponible
      switchMap(token => {
        const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
        return this.http.get<EventForm>(`${this.apiUrl}/${eventId}`, {
          headers
        });
      })
    )
  }

  getEventByIdToUpdate(eventId: string, isUpdating: boolean): Observable<EventForm>{
    console.log('eventId 4: ' + eventId);
    console.log('isUpdating: ' + isUpdating);

    if (isUpdating) {
      this.isUpdatingSubject.next(isUpdating);
    }

    console.log('isUpdating$' + this.isUpdating$)

    return this.authService.getToken().pipe(
      filter(token => !!token), // Espera a que el token esté disponible
      switchMap(token => {
        const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
        return this.http.get<EventForm>(`${this.apiUrl}/${eventId}`, {
          headers
        });
      })
    )

  }

  // metodo que guarda los datos a editar en el signal
  setEventData(data: EventForm) {
    // aqui actualizamos el evento y se notifica a los suscriptores
    this.eventData.next(data);
  }

  setEventId(eventId: string) {
    this.eventId.next(eventId);
    // aqui guardamos el id del evento para luego usarlo para obtener los datos en el componente de edicion
  }

  setIsUpdating(isUpdating: boolean) {
    this.isUpdatingSubject.next(isUpdating);
  }


  updateEvent(id: string, body: EventForm): Observable<EventForm> {
    console.log('body update: ', body);

    return this.authService.getToken().pipe(
      filter(token => !!token), // Espera a que el token esté disponible
      switchMap(token => {
        console.log('token update: ', token);
        const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
        // const eventId = this.eventId.getValue();
        console.log('eventId update: ', id);
        if (!id) {
          throw new Error('No eventId provided to update');
        }
        console.log('actualizando evento en service')
        return this.http.put<EventForm>(`${this.apiUrl}/${id}`, body, {
          headers
        });
      })
    );
  }
}
