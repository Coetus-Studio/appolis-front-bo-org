import { Routes } from "@angular/router";
import { AuthGuard } from "../../core/guards/auth.guard";

export const HOME_ROUTES: Routes = [

{
  path: '',
  // component: HomeComponent,
  loadComponent: () => import('./pages/home-org/home-org.component'),
  canActivate: [AuthGuard],
}

]
