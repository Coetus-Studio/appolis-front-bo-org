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
  {
    path: 'documents',
    loadChildren: () => import('./features/documents/documents.routes').then(m => m.DOCS_ROUTES)
  },
  {
    path: 'token',
    loadChildren: () => import('./features/token/token.routes').then(m => m.TOKEN_ROUTES)
  },
  {
    path: 'events',
    loadChildren: () => import('./features/events/events.routes').then(m => m.EVENT_ROUTES)
  },
  {
    path: 'opportunities',
    loadChildren: () => import('./features/opportunities/opportunities.routes').then(m => m.OPPORTUNITIES_ROUTES)
  },




  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Ruta predeterminada
  { path: '**', redirectTo: '/login' }, // Ruta comodín para manejar rutas no encontradas


];
