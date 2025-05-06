import { Injectable } from '@angular/core';
import { Opportunity } from '../interfaces/opportunities.interface';
import { filter, map, Observable, switchMap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StorageService } from '../../../storage.service';
import { AuthService } from '../../../auth/auth.service';


@Injectable({
  providedIn: 'root'
})
export class OpportunitiesService {

  private authToken: string | undefined | null = '';

  private readonly apiUrl: string = 'http://localhost:3000/v1/opportunities';

  constructor(
    private http: HttpClient,
    private storage: StorageService,
    private authService: AuthService
  ) {
    this.initAuthToken();
  }

  private async initAuthToken() {
    this.authToken = await this.storage.getItem('authToken');

    if (!this.authToken) {
      console.error('No se encontró el authToken');
    }

    console.log('authToken: ', this.authToken);
  }


  listOpportunities(): Observable<Opportunity[]> {
    console.log('listOpportunities');

    return this.authService.getToken().pipe(
      filter(token => !!token),
      switchMap(token => {
        const headers = new HttpHeaders({ Authorization: `Bearer ${token}` })
        return this.http.get<any[]>(`${this.apiUrl}`, { headers })

      })
    )

  }
  getOpportunityById(opportunityId: string): Observable<Opportunity> {

    return this.authService.getToken().pipe(
      filter(token => !!token), // Espera a que el token esté disponible
      switchMap(token => {
        const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
        return this.http.get<Opportunity>(`${this.apiUrl}/${opportunityId}`)
        headers
      })
    )
  }
}
