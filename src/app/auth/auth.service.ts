import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { BehaviorSubject, lastValueFrom, Observable } from 'rxjs';
import { StorageService } from '../storage.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000';

  //
  private authToken$: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);


  constructor(
    private storageService: StorageService,
    private http: HttpClient,
    private router: Router
  ) {
    this.loadToken();

  }

   // Método público para obtener el token como un Observable
   getToken(): Observable<string | null> {
    return this.authToken$.asObservable();
  }

  private async loadToken() {
    const token = await this.storageService.getItem('authToken');
    this.authToken$.next(token ?? null); // Si es undefined, lo convierte en null
  }

  async login(
    { email, password } :
    { email: string; password: string }
  ): Promise<any> {
    try {
      if (!email || !password) {
        return false;
      }

      if (await this.storageService?.getItem('isAuthenticated') === 'true') {
        return true;
      }

      const response = await lastValueFrom(
        this.http.post<any>(`${this.apiUrl}/v1/auth/signin`, {
          email,
          password,
        })
      );

      await this.storageService.setItem('authToken', response.accessToken);

      await this.storageService?.setItem('isAuthenticated', 'true');

      // Actualiza el token en el BehaviorSubject
      this.authToken$.next(response.accessToken);

      return true;
    } catch (error) {
      throw error;
    }
  }

  async logout() {
    await this.storageService.clear();
    this.authToken$.next(null); // Elimina el token en memoria
    this.router.navigate(['/']);
  }

  async checkAuthentication(): Promise<boolean> {
    return await this.storageService?.getItem('isAuthenticated') === 'true';
  }
}
