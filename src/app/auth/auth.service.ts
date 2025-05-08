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

  private authToken$: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

  private isAuthenticated$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);



  private orgUserId = new BehaviorSubject<string | null | undefined>('');
  orgUserId$ = this.orgUserId.asObservable();

  private userRolOrganization = new BehaviorSubject<string | null | undefined>('');
  userRolOrganization$ = this.userRolOrganization.asObservable();

  // informa a nav-bar component
  private organizationName = new BehaviorSubject<string | null | undefined>('');
  organizationName$ = this.organizationName.asObservable();

  // informa a list-event component orgId
  private organizationId = new BehaviorSubject<string | null | undefined>('');
  organizationId$ = this.organizationId.asObservable();

  // informa a app.component estado de autenticacion
  private authState = new BehaviorSubject<boolean>(false);
  authState$ = this.authState.asObservable();

  constructor(
    private storageService: StorageService,
    private http: HttpClient,
    private router: Router
  ) {
    this.loadToken();
    // this.loadUserData();
  }

   // Método público para obtener el token como un Observable
  getToken(): Observable<string | null> {
    return this.authToken$.asObservable();
  }


  getIsAuthenticated(): Observable<boolean> {
    return this.isAuthenticated$.asObservable();
  }

  private async loadToken() {
    const token = await this.storageService.getItem('authToken');
    this.authToken$.next(token ?? null); // Si es undefined, lo convierte en null
  }

  // private async loadUserData() {}

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

      console.log('USUARIO ', response.user);
      await this.storageService.setItem('authToken', response.accessToken);
      await this.storageService.setItem('email', response.user.email);

/*       // dado que roles es un array, lo convertimos primero a string para setear en local storage
      await this.storageService.setItem('roles', JSON.stringify(response.user.rolesByOrganization[0].role.name));
      await this.storageService.setItem('orgId', JSON.stringify(response.user.rolesByOrganization[0].organization._id));
      await this.storageService.setItem('orgName', JSON.stringify(response.user.rolesByOrganization[0].organization.name)); // revisar no se graba */

      await this.storageService.setItem('roles', response.user.rolesByOrganization[0].role.name);
      await this.storageService.setItem('orgId', response.user.rolesByOrganization[0].organization._id);
      await this.storageService.setItem('orgName', response.user.rolesByOrganization[0].organization.name); // revisar no se graba
      await this.storageService.setItem('orgUserId', response.user._id)

      this.authToken$.next(response.accessToken);
      await this.storageService?.setItem('isAuthenticated', 'true');

      // Agregamos esto para notificar autenticación
      this.authState.next(true); // Esto asegura que el observable se actualice y carguemos el sidebar y navbar al hacer login
      this.router.navigate(['/home']);

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
    const isLogged = await this.storageService.getItem('isAuthenticated') === 'true';
    this.authState.next(isLogged);
    return isLogged;
  }

  async getOrgId(): Promise<string | null | undefined> {
    const orgId = await this.storageService.getItem('orgId');
    this.organizationId.next(orgId);
    return orgId;
  }

  async getOrgName(): Promise<string | null | undefined> {
    const orgName = await this.storageService.getItem('orgName');
    this.organizationName.next(orgName);
    return orgName;
  }

  async getUserRol(): Promise<string | null | undefined> {
    const userRol = await this.storageService.getItem('roles');
    this.userRolOrganization.next(userRol);
    return userRol;
  }

  async getOrgUserId(): Promise<string | null | undefined> {
    const userId = await this.storageService.getItem('orgUserId');
    this.orgUserId.next(userId);
    return userId;
  }
}
