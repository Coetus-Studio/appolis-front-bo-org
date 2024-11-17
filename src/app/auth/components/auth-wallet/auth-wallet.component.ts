import { Component, EventEmitter, OnInit, output, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EthereumService } from '../../../shared/services/etherum.service';
import BalanceTokenComponent from "../../../features/token/pages/balance-token/balance-token.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-auth-wallet',
  standalone: true,
  imports: [CommonModule, BalanceTokenComponent, RouterOutlet],
  templateUrl: './auth-wallet.component.html',
  styleUrl: './auth-wallet.component.css'
})
export default class AuthWalletComponent implements OnInit {

  // variables para mostrar el estado de la conexión y el botón de conexión
  private isConnectedToBlockchain: boolean = false;
  public addressUser: string = '';

  constructor(
    private ethereumService: EthereumService,
  ) { }

  // TODO: se podria dejar addressUser dentro de ngOnInit??
  ngOnInit(): void {
    this.ethereumService.userAddress$.subscribe(address => {
      this.addressUser = address;
    })
  }

  get isConnected() {
    return this.isConnectedToBlockchain;
  }

  get connectedAddress() {
    console.log('Getting connected address...: ', this.addressUser);
    return this.addressUser;
  }

  // conexión con metamask
  async connectToWallet() {
    try {
      await this.ethereumService.connectToMetaMaskWallet();
      this.isConnectedToBlockchain = true;
      // Obtén el signer
      const signer = await this.ethereumService.getSigner();
      if (signer) {
        // Obtén la dirección del signer
        this.addressUser = await signer.getAddress();
        console.log('address user: ', this.addressUser);
        // this.address = this.addressUser.toString();
      } else {
        console.error('Signer is undefined');
        this.isConnectedToBlockchain = false;
      }
    } catch (error) {
      console.error('Error connecting to wallet', error);
      this.isConnectedToBlockchain = false;
    }
    console.log('Connect address: ', this.addressUser);
  }
}
