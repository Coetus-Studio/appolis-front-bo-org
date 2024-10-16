import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { StorageService } from '../../storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {

  constructor(
    private storageService: StorageService,    
    private router: Router
  ) {}

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree> {
      console.log('AuthGuard canActivate');
      
      if (await this.storageService?.getItem('isAuthenticated') === 'true') {
        console.log('Usuario autenticado');
        if(state.url == '/login') {
          this.router.navigate(['/dashboard']);
          return false;
        } else {
          return true;
        }
      } else {
        console.log('Usuario no autenticado');
        this.router.navigate(['/login'], /* { queryParams: { returnUrl: state.url } }*/);        
        return false;
      }    
  }
  
}