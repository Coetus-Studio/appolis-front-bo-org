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

  // registeredOrgId: string | null = '';
  registeredOrgName: string | null | undefined = '';
  registeredUserName: string | null = '';
  registeredUserRole: string | null | undefined = '';
  // isAuthenticated: boolean = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.getDataStorage();
    // this.getOrgIdFromStorage();
  }

  //
  async getDataStorage() {
    this.authService.organizationName$.subscribe((orgName) => {
      console.log("orgName => ", orgName)
      this.registeredOrgName = orgName;
    })
    this.authService.orgName();

    this.authService.userRolOrganization$.subscribe((userRol) => {
      console.log("userRol => ", userRol)
      this.registeredUserRole = userRol;
    })
    this.authService.userRol();

    // this.authService.getOrgName().subscribe(orgName => {
    //   this.registeredOrgName = orgName;
    // });
  }
}
