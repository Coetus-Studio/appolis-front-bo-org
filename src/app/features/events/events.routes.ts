import { Routes } from "@angular/router";


export const EVENT_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home-event/home-event.component')
  },
  {
    path: 'list',
    loadComponent: () => import('./pages/list-event/list-events.component')
  },
  {
    path: 'detail/:id',
    loadComponent: () => import('./pages/event-detail/event-detail.component'),
  },
  {
    path: 'edit/:id',
    loadComponent: () => import('./pages/edit-event/edit-event.component'),
  },
  // TODO: revisar este route si esta bien que sea children y su ruta
  {
    path: 'create',
    loadComponent: () => import('./pages/create-event/create-event.component'),
      children: [
        {
          path: 'create-location',
          loadComponent: () => import('../../shared/map-org/pages/create-citizen-points/create-citizen-point.component'),
          // loadComponent: () => import('./pages/list-event/list-events.component')
        }
      ]
  },

]
