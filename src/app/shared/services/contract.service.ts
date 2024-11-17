import { Injectable } from '@angular/core';
import { Contract, ethers } from 'ethers'; // Proporciona herramientas para interactuar con la blockchain de Ethereum.
import { EthereumService } from './etherum.service';
// import { EthereumService } from './ethereum.service';
// import Marketplace from '../../assets/contracts-data/Marketplace.json'
import { BehaviorSubject } from 'rxjs';
import { MetaMaskInpageProvider } from '@metamask/providers';


@Injectable({
  providedIn: 'root'
})
export class ContractService {

  // Mantiene una instancia de Web3Provider de ethers.js, que se utiliza para interactuar con la red Ethereum.
  private provider: ethers.providers.Web3Provider | undefined;

  private signer: ethers.providers.JsonRpcSigner | undefined;

  // TODO: revisar signer
  // mantiene el firmante actual (una instancia de JsonRpcSigner) y emite cambios a los suscriptores.
  // private signer: BehaviorSubject<ethers.providers.JsonRpcSigner | undefined> = new BehaviorSubject<ethers.providers.JsonRpcSigner | undefined>(undefined);

  // almaceno una instancial del smartcontract. Inicialmente es undefined
  public contract: ethers.Contract | undefined;

  constructor(private ethereumService: EthereumService) { }

  async getContract(address: string, abi: ethers.ContractInterface): Promise<ethers.Contract | undefined> {
    // obtenemos el signer
    const signer = await this.ethereumService.getSigner();
    // console.log('signer', signer);

    if (!signer) {
      console.log('Need to be signed in to get contracts!');
      return;
    }

    // creamos la instancia del smart contract pasando address, abi y signer
    this.contract = new ethers.Contract(address, abi, signer);
    console.log('Contract loaded: ', this.contract);


    return this.contract; // Devuelve la instancia del contrato
  }


  async transferFrom(addressFrom: string, addressTo: string, amount: number) {
    try {
        console.log('En contract service');
        console.log('Transfer from', addressFrom);
        console.log('To', addressTo);
        console.log('Amount', amount);

        // Asegúrate de que this.contract esté inicializado
        if (!this.contract) {
            console.error('El contrato no está inicializado.');
            return;
        }

        console.log('contract está inicializado', this.contract);

        // Convierte el amount a wei
        // const amountInWei = ethers.utils.parseUnits(amount.toString(), 18);
        // console.log('Amount in Wei:', amountInWei);

        // Llama a transferFrom
        const tx = await this.contract['transferFrom'](addressFrom, addressTo, 1000000000);
        console.log('Transaction Hash:', tx.hash);

        // Espera a que la transacción sea confirmada
        await tx.wait();
        console.log('Transaction confirmed!');
    } catch (error) {
        console.error('Error en transferFrom:', error);
    }
}



  async getBalance(address: string)  {
    // Obtenemos el balance del smart contract
    console.log('address recibido: ', address);
    const balance = await this.contract!['balanceOf'](address);
    console.log('Balance: ', balance);

    // Convertimos el balance a un número entero entendible1
    const balanceInEther = ethers.utils.formatUnits(balance, 18);
    console.log('Balance en Ether: ', balanceInEther);

    return balanceInEther;
  }


//   async approveBalance() {
//     try {
//         console.log('En contract service');
//         // Asegúrate de que this.contract esté inicializado
//         if (!this.contract) {
//             console.error('El contrato no está inicializado.');
//             return;
//         }
//         // Obtenemos el balance del wallet
//         const walletBalance = await this.contract['getBalance']();
//         console.log('Wallet Balance:', walletBalance);
//         // Obtenemos el balance del smart contract
//         const contractBalance = await this.getBalance();
//         console.log('Contract Balance:', contractBalance);
//         // Calculamos la cantidad de tokens que se pueden aprobar
//         const amountToApprove = contractBalance.sub(walletBalance);
//         console.log('Amount to approve:', amountToApprove);
//         // Convierte el amount a wei
//         const amountInWei = ethers.utils.parseUnits(amountToApprove.toString(), 18);
//         console.log('Amount in Wei:', amountInWei);
//         // Llama a approve
// /*         const tx = await this.contract.functions['approve'](Marketplace.address, amountInWei);
//         console.log('Transaction Hash:', tx.hash);
//         // Espera a que la transacción sea confirmada
//         await tx.wait();
//         console.log('Transaction confirmed!'); */
//     } catch (error) {
//       console.error('Error en approveBalance:', error);
//     }
//   }


}
