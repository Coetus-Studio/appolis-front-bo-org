import { Component } from '@angular/core';
import { AuthService } from '../../../auth/auth.service';
import { RouterLink, RouterOutlet } from '@angular/router';
import BalanceTokenComponent from '../../../features/token/pages/balance-token/balance-token.component';
import { routes } from '../../../app.routes';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'shared-side-bar',
  standalone: true,
  imports: [RouterLink, RouterOutlet, CommonModule],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.css'
})
export class SideBarComponent {

  // isAuthenticated: boolean = false;

  // constructor(
  //   private authService: AuthService,
  // ){
  //   this.isLoggedIn();
  // }

  // async isLoggedIn() {
  //   this.isAuthenticated = await this.authService.checkAuthentication();
  // }
}
