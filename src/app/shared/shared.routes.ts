import { Routes } from "@angular/router";

export const LOCATIONS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./components/map-org/locations.component'),
  }
]
