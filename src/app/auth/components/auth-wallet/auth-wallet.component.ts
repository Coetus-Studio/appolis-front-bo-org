import { Component } from '@angular/core';
import { EthereumService } from '../services/etherum.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-auth-wallet',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './auth-wallet.component.html',
  styleUrl: './auth-wallet.component.css'
})
export class AuthWalletComponent {


   // variables para mostrar el estado de la conexión y el botón de conexión
   private isConnectedToBlockchain: boolean = false;
   // addressUser: any = new BehaviorSubject<string>('');
   addressUser: string = '';

   constructor(private ethereumService: EthereumService) { }

   ngOnInit(): void {
    //  throw new Error('Method not implemented.');
    //  this.connectToWallet();
   }

   get isConnected() {
     return this.isConnectedToBlockchain;
   }

   get connectedAddress() {

     console.log('Getting connected address...: ', this.addressUser);

     return this.addressUser;

   }

   async connectToWallet() {

     try {
       await this.ethereumService.connectToMetaMaskWallet();
       this.isConnectedToBlockchain = true;
       this.addressUser = await this.ethereumService.getSigner(); // Guarda la dirección en addressUser
     } catch (error) {
       console.error('Error connecting to wallet', error);
       this.isConnectedToBlockchain = false;
     }

   }


}
