import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EthereumService } from '../../../shared/services/etherum.service';

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

   // TODO: se podria dejar addressUser dentro de ngOnInit??
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

   // coneccion con metamask
  //  async connectToWallet() {

  //    try {
  //      await this.ethereumService.connectToMetaMaskWallet();
  //      this.isConnectedToBlockchain = true;
  //      this.addressUser = await this.ethereumService.getSigner(); // Guarda la dirección en addressUser
  //    } catch (error) {
  //      console.error('Error connecting to wallet', error);
  //      this.isConnectedToBlockchain = false;
  //    }


  //    console.log('Connect address: ', this.addressUser);

  //  }


  // conexión con metamask
// async connectToWallet() {
//   try {
//     await this.ethereumService.connectToMetaMaskWallet();
//     this.isConnectedToBlockchain = true;

//     // Asegúrate de que estás obteniendo el signer correctamente
//     const signer = await this.ethereumService.getSigner();

//     if (signer) {
//       this.addressUser = signer; // Asumiendo que `signer` es la dirección en este caso
//     } else {
//       console.error('Signer is undefined');
//       this.isConnectedToBlockchain = false; // O maneja esto como prefieras
//     }
//   } catch (error) {
//     console.error('Error connecting to wallet', error);
//     this.isConnectedToBlockchain = false;
//   }

//   console.log('Connect address: ', this.addressUser);
// }

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
