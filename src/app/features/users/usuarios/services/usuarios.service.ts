import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { UsuariosForm } from '../interfaces/usuarios.interface';
import { StorageService } from '../../../../storage.service';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

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

  getAllUsuarios(): Observable<UsuariosForm[]> {
    console.log('Service list usuarios', this.authToken);

    const headers = {
      Authorization: `Bearer ${this.authToken}`,
    }

    return this.http.get<UsuariosForm[]>(this.apiUrl, { headers })
      .pipe(map(res => res))
  }

  createEvent(body: UsuariosForm): Observable<any> {
    console.log('Service create event', body);
    return this.http.post<UsuariosForm[]>(this.apiUrl, body).pipe(map(res => res))
  }

}
