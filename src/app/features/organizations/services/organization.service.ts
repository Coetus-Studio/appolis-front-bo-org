import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { filter, Observable, switchMap } from 'rxjs';
import { AuthService } from '../../../auth/auth.service';

export interface Organization {
  id: string;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {
  private apiUrl = 'http://localhost:3000/v1/organizations'; // Assuming an API endpoint

  constructor(private http: HttpClient, private authService: AuthService) { } // Inject AuthService

  getOrganizations(): Observable<Organization[]> {

    return this.authService.getToken().pipe(
          filter(token => !!token),
          switchMap(token => {
            const headers = new HttpHeaders({ Authorization: `Bearer ${token}` })
            return this.http.get<Organization[]>(`${this.apiUrl}`, { headers })
          })
        )      
    
  }
}
