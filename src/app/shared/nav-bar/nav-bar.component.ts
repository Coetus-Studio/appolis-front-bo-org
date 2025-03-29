import { Component } from '@angular/core';
import AuthWalletComponent from '../../auth/components/auth-wallet/auth-wallet.component';
import BalanceTokenComponent from '../../features/token/pages/balance-token/balance-token.component';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'shared-nav-bar',
  standalone: true,
  imports: [AuthWalletComponent],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})

export class NavBarComponent {

  orgUserRegistered: string | null = '';
  rolUserRegistered: string | null = '';

  constructor( private authService: AuthService) {

    this.guardaInfoGlobal();
  }

  //
  async guardaInfoGlobal() {
    // Obtiene la información global y la almacena en el local storage
    // await this.globalService.fetchGlobalData();

    this.authService.getOrgUser().subscribe(orgUser => {
      this.orgUserRegistered = orgUser;
      console.log('orgUserRegistered 1: ', this.orgUserRegistered);

    });

    this.authService.getRoles().subscribe(rolUser => {
      this.rolUserRegistered = rolUser;
      console.log('rolUserRegistered: ', this.rolUserRegistered);
  });

  }



}
