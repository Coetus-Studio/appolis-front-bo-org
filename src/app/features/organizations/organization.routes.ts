import { Routes } from '@angular/router';

export const ORGANIZATION_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/list-organization/list-organization.component'),
  },
  {
    path: 'create',
    loadComponent: () => import('./pages/add-organization/add-organization.component'),
  },
  // {
  //   path: 'list',
  //   loadComponent: () => import('./pages/list-organization/list-organizations.component'),
  // },
];
