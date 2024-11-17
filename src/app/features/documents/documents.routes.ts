import { Routes } from "@angular/router";

export const DOCS_ROUTES: Routes = [

  {
    path: '',
    loadComponent: () => import('./documents.component'),
  },
  {
    path: 'create',
    loadComponent: () => import('./residence/pages/create-docs/create-docs.component'),
  },
  {
    path: 'summary',
    loadComponent: () => import('./residence/pages/create-docs/summary-docs.component'),
  }

]
