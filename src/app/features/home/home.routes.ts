import { Routes } from "@angular/router";
import { HomeComponent } from "./components/home.component";
import { AuthGuard } from "../../core/guards/auth.guard";


export const HOME_ROUTES: Routes = [

{
  path: '',
  component: HomeComponent,
  canActivate: [AuthGuard],
}

]
