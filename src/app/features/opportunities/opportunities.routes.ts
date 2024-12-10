import { Routes } from "@angular/router";

export const OPPORTUNITIES_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/list-opportunities/list-opportunities.component'),

  }
]
