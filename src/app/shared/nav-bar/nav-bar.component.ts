import { Component, OnInit } from '@angular/core';
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

export class NavBarComponent implements OnInit {


  registeredOrgId: string | null = '';
  registeredOrgName: string | null = '';
  registeredUserName: string | null = '';
  registeredUserRole: string | null = '';
  // isAuthenticated: boolean = false;


  constructor(private authService: AuthService) {

  }

  ngOnInit(): void {
    this.getDataStorage();
  }

  //
  async getDataStorage() {

    this.authService.getOrgId().subscribe(orgId => {
      this.registeredOrgId = orgId;
      console.log('orgUserRegistered 1: ', this.registeredOrgId);
    });

    this.authService.getRoles().subscribe(rolUser => {
      this.registeredUserRole = rolUser;
      // console.log('roles usuario registrado: ', this.registeredUserRole);
    });

    this.authService.getOrgName().subscribe(orgName => {
      this.registeredOrgName = orgName;
      // console.log('nombre organizacion logeada: ', this.registeredOrgName);
    });

/*     this.authService.getIsAuthenticated().subscribe(isAuth => {
      this.isAuthenticated = isAuth;
    }) */

  }

}
