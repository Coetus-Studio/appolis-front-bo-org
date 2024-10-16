import { Routes } from '@angular/router';
import { StorageService } from './storage.service';

export const routes: Routes = [

  {
    path: '',
    loadChildren: () => import('./auth/auth.routes').then(m => m.AUTH_ROUTES),    
  },
  {
    path: 'home',
    loadChildren: () => import('./features/home/home.routes').then(m => m.HOME_ROUTES)
  },







  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Ruta predeterminada
  { path: '**', redirectTo: '/login' }, // Ruta comodín para manejar rutas no encontradas


];
