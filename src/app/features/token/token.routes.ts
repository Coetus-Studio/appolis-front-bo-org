import { Routes } from "@angular/router";


export const BUYTOKEN_ROUTES: Routes = [

  {
    path: '',
    loadComponent: () => import('./home-token.components'),
  },
  {
    path: 'buy',
    loadComponent: () => import('./pages/buy-token/buy-token.component'),
  },
  {
    path: 'balance',
    loadComponent: () => import('./pages/balance-token/balance-token.component'),
  }
]

