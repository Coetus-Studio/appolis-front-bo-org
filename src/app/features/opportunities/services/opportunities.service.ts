import { Injectable } from '@angular/core';
import { Opportunity } from '../interfaces/opportunities.interface';
import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { StorageService } from '../../../storage.service';

@Injectable({
  providedIn: 'root'
})
export class OpportunitiesService {

  private authToken: string | undefined | null = '';

  private readonly apiUrl: string = 'http://localhost:3000/v1/opportunities';

  constructor(
    private http: HttpClient,
    private storage: StorageService,
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

    const headers = {
      Authorization: `Bearer ${this.authToken}`,
    }

    return this.http.get<Opportunity[]>(this.apiUrl, { headers })
     .pipe(map(res => res));



  }
}
