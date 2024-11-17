import { Component } from '@angular/core';
import AuthWalletComponent from '../../../auth/components/auth-wallet/auth-wallet.component';
import BalanceTokenComponent from '../../../features/token/pages/balance-token/balance-token.component';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'shared-nav-bar',
  standalone: true,
  imports: [AuthWalletComponent, BalanceTokenComponent, RouterLink, RouterOutlet],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {

}
