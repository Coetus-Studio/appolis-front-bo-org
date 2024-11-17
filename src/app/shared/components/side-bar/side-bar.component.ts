import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import BalanceTokenComponent from '../../../features/token/pages/balance-token/balance-token.component';

@Component({
  selector: 'shared-side-bar',
  standalone: true,
  imports: [RouterLink, RouterOutlet, BalanceTokenComponent],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.css'
})
export class SideBarComponent {

}
