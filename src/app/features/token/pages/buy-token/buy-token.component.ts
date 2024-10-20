import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ContractService } from '../../../../shared/services/contract.service';

@Component({
  selector: 'app-buy-token',
  standalone: true,
  imports: [RouterLink, RouterOutlet, CommonModule],
  templateUrl: './buy-token.component.html',
  styleUrl: './buy-token.component.css'
})
export default class BuyTokenComponent {


  constructor(private contractService: ContractService) { }


}
