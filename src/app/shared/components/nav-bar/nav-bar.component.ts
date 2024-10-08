import { Component } from '@angular/core';
import { AuthWalletComponent } from '../../../auth/components/auth-wallet/auth-wallet.component';

@Component({
  selector: 'shared-nav-bar',
  standalone: true,
  imports: [AuthWalletComponent],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {

}
