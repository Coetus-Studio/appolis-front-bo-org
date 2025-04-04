import { Routes } from "@angular/router";

export const REQUIREMENTS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home-requirements/home-requirements.component'),
  },
  {
    path: 'list-requirements',
    loadComponent: () => import('./pages/list-requirements/list-requirements.component'),
  },
  {
    path: 'detail/:id',
    loadComponent: () => import('./pages/requirement-detail/requirement-detail.component'),
  }
  //... more routes here...
]
