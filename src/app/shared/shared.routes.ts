import { Routes } from "@angular/router";

export const SHARED_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./map-org/pages/home-citizen-points/home-citizen-points.component'),
  },
  {
    path: 'list',
    loadComponent: () => import('./map-org/pages/list-citizen-points/list-citizen-points.component'),
  },
  {
    path: 'create',
    loadComponent: () => import('./map-org/pages/create-citizen-points/create-citizen-point.component'),
  }
]
