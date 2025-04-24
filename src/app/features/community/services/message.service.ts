import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { filter, firstValueFrom, Observable, switchMap } from 'rxjs';
import { StorageService } from '../../../storage.service';
import { AuthService } from '../../../auth/auth.service';

@Injectable({ providedIn: 'root' })
export class MessageService {
  private baseUrl = 'http://localhost:3000/v1/organizations';

  constructor(private http: HttpClient, private storageService: StorageService, private authService: AuthService) { }

  sendMessage(data: { title: string; content: string }): Observable<any> {
    return this.authService.getToken().pipe(
      filter((token): token is string => !!token), // Asegura que el token no sea null
      switchMap(token => {
        return this.storageService.getItem('orgId').then(orgId => {
          if (!orgId) {
            throw new Error('Organización no encontrada');
          }

          const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
          return this.http.post(`${this.baseUrl}/${orgId}/messages`, data, { headers });
        });
      }),
      // Convierte el Promise<HttpResponse> en un observable plano
      switchMap((response) => response)
    );
  }


}
