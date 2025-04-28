import { Routes } from '@angular/router';
import { StorageService } from './storage.service';

export const routes: Routes = [

  {
    path: 'login',
    loadChildren: () => import('./auth/auth.routes').then(m => m.AUTH_ROUTES),
    title: 'Appolis Organizaciones - Loginn'
  },
  {
    path: 'home',
    loadChildren: () => import('./features/home/home.routes').then(m => m.HOME_ROUTES),
    title: 'Appolis Organizaciones - Home'
  },
  {
    path: 'documents',
    loadChildren: () => import('./features/documents/documents.routes').then(m => m.DOCS_ROUTES),
    title: 'Appolis Organizaciones - Documentosn'
  },
  {
    path: 'token',
    loadChildren: () => import('./features/token/token.routes').then(m => m.TOKEN_ROUTES)
  },
  {
    path: 'events',
    loadChildren: () => import('./features/events/events.routes').then(m => m.EVENT_ROUTES),
    title: 'Appolis Organizaciones - Eventos'
  },
  {
    path: 'opportunities',
    loadChildren: () => import('./features/opportunities/opportunities.routes').then(m => m.OPPORTUNITIES_ROUTES),
    title: 'Appolis Organizacionesn - Opotunidades'
  },
  {
    path: 'organization',
    loadChildren: () => import('./features/organizations/organization.routes').then(m => m.ORGANIZATION_ROUTES),
    title: 'Appolis Organizaciones - Organizaciones'
  },
  {
    path: 'community/messages',
    loadComponent: () => import('./features/community/message-compose/message-compose.component').then(m => m.MessageComposeComponent),
    title: 'Appolis Organizaciones - Comunidad'
  },
  {
    path: 'locations',
    loadChildren: () => import('./shared/shared.routes').then(m => m.SHARED_ROUTES)
  },
  {
    path: 'requirements',
    loadChildren: () => import('./features/requirements/requirements.routes').then(m => m.REQUIREMENTS_ROUTES)
  },
  {
    path: 'users',
    loadChildren: () => import('./features/users/users.routes').then(m => m.USERS_ROUTES)
  },

  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Ruta predeterminada
  { path: '**', redirectTo: '/login' }, // Ruta comodín para manejar rutas no encontradas
  {
  path: 'logout',
  loadComponent: () => import('./features/logout/logout.component').then(m => m.LogoutComponent)
}


];
