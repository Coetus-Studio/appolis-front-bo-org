import { Routes } from "@angular/router";

export const SHARED_ROUTES: Routes = [
  // {
  //   path: '',
  //   loadComponent: () => import('./map-org/pages/home-locations/home-locations.component'),
  // },
  {
    path: '',
    loadComponent: () => import('./map-org/pages/list-locations/list-locations.component'),
  },
  {
    path: 'create',
    loadComponent: () => import('./map-org/pages/create-citizen-map/create-citizen-map.component'),
  }
]
