import { Routes } from "@angular/router";
import { UsersEditComponent } from "./pages/users-edit/users-edit.component";
import { UsersListComponent } from "./pages/users-list/users-list.component";

export const USERS_ROUTES: Routes = [
  { path: '', component: UsersListComponent },
  { path: 'edit/:id', component: UsersEditComponent },
]
