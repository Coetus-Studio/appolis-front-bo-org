import { Routes } from "@angular/router";

export const TOKEN_ROUTES: Routes = [

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
  },
  {
    path: 'transfer',
    loadComponent: () => import('./pages/transfer-token/transfer-token.component'),
  },
  {
    path: 'staking',
    loadComponent: () => import('./pages/staking-appolis-token/staking-appolis-token.component'),
  }
]

