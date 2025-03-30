import { Injectable } from "@angular/core";
import { AuthService } from "../../auth/auth.service";

@Injectable({
  providedIn: "root"
})
export class NavBarService {

  constructor(
    private authService: AuthService
  ) {}

  getUserInfo() {
  }
}
