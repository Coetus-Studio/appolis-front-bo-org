import { Injectable, signal } from "@angular/core";
import { AuthService } from "../../auth/auth.service";

@Injectable({
  providedIn: "root"
})
export class NavBarService {

  registeredOrgName = signal<string | null | undefined>('');


}
