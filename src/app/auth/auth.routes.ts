import { Routes } from "@angular/router";
import { AuthComponent } from "./auth.component";


export const AUTH_ROUTES: Routes = [

  // {
  //   path: 'register', component: RegisterComponent
  // },
  // {
  //   path: '', component: AuthComponent
  // }

  { path: '', redirectTo: 'home', pathMatch: 'full' }, // Redirigir a home si ya hay sesión activa
  { path: '**', redirectTo: 'home' }, // Evita bucles infinitos

]
