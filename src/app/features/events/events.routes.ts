import { Routes } from "@angular/router";


export const EVENT_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home-event/home-event.component'),
    // children: [
    //   {
    //     path: 'list',
    //     loadComponent: () => import('./pages/list-event/list-events.component'),
    //   },
    //   {
    //     path: 'create',
    //     loadComponent: () => import('./pages/create-event/create-event.component'),
    //   },
    // ]
  },
  {
    path: 'list',
    loadComponent: () => import('./pages/list-event/list-events.component')
  },
  {
    path: 'create',
    loadComponent: () => import('./pages/create-event/create-event.component'),
      children: [
        {
          path: 'create-location',
          loadComponent: () => import('../../shared/map-org/pages/create-locations/create-locations.component'),
          // loadComponent: () => import('./pages/list-event/list-events.component')

        }
      ]
  },
  // {
  //   path: 'create-location',
  //   loadComponent: () => import('../../shared/map-org/pages/create-locations/create-locations.component')
  //   // loadComponent: () => import('./pages/list-event/list-events.component')

  // }

]
