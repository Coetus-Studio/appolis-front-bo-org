import { Routes } from "@angular/router";

export const REQUIREMENTS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home-requirements/home-requirements.component'),
  },
  {
    path: 'list-requirements',
    loadComponent: () => import('./pages/list-requirements/list-requirements.component'),
  }
  //... more routes here...
]
