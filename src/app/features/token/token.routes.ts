import { Routes } from "@angular/router";


export const BUYTOKEN_ROUTES: Routes = [

  {
    path: '',
    loadComponent: () => import('./pages/buy-token/buy-token.component'),
  }
]

