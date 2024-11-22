import { Routes } from "@angular/router";


export const EVENT_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home-event/events.component'),
  },
  // {
  //   path: 'create',
  //   // loadComponent: () => import('./pages/create-event/create-event.component'),
  // },
  {
    path: 'list',
    loadComponent: () => import('./pages/list-events/list-events.component')
  },

]
