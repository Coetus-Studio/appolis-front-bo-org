import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { lastValueFrom, Observable } from 'rxjs';
import { StorageService } from '../storage.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {    
  private apiUrl = 'http://localhost:3000';  

  constructor(
    // private storageService: StorageService,
    private http: HttpClient,
    private router: Router
  ) {}


  async login(
    { email, password } : 
    { email: string; password: string }
  ): Promise<any> {
    try {
      if (!email || !password) {
        return false;
      }
      
      // if (await this.storageService?.getItem('isAuthenticated') === 'true') {
      //   return true;
      // }

      let response = await lastValueFrom(
        this.http.post<any>(`${this.apiUrl}/v1/auth/signin`, {
          email,
          password,
        })
      );

      // console.log('response',response);
      
      // await this.storageService.setItem('authToken', response.accessToken);
      
      // await this.storageService?.setItem('isAuthenticated', 'true');

      return true; 
    } catch (error) {      
      return false;
    }          
  }

  async logout() {    
    // await this.storageService?.setItem('isAuthenticated', 'false');
    this.router.navigate(['/login']);
  }

  // async checkAuthentication(): Promise<boolean> {    
  //   // return await this.storageService?.getItem('isAuthenticated') === 'true';
  // }
}