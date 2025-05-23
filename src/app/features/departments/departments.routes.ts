import { Routes } from "@angular/router";

export const DEPARTMENTS_ROUTES: Routes = [
  // {
  //   path: '',
  //   loadComponent: () => import('./pages/home-department/home-department.component')
  // },
  {
    path: '',
    loadComponent: () => import('./pages/list-departaments/list-departaments.component')
  },
  {
    path: 'create',
    loadComponent: () => import('./pages/create-department/create-department.component')
  }
]
