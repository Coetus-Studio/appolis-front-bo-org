import { Injectable } from '@angular/core';
import { Contract, ethers } from 'ethers'; // Proporciona herramientas para interactuar con la blockchain de Ethereum.
import { EthereumService } from './etherum.service';
// import { EthereumService } from './ethereum.service';
import Marketplace from '../../assets/contracts-data/Marketplace.json'
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ContractService {


  // Mantiene una instancia de Web3Provider de ethers.js, que se utiliza para interactuar con la red Ethereum.
  private provider: ethers.providers.Web3Provider | undefined;

  // mantiene el firmante actual (una instancia de JsonRpcSigner) y emite cambios a los suscriptores.
  // private signer: BehaviorSubject<ethers.providers.JsonRpcSigner | undefined> = new BehaviorSubject<ethers.providers.JsonRpcSigner | undefined>(undefined);


  // almaceno una instancial del smartcontract. Inicialmente es undefined
  public contract: ethers.Contract | undefined;


  constructor(private ethereumService: EthereumService) { }

  // // inicializamos smartcontract.
  // getContract(address: string, abi: ethers.ContractInterface): ethers.Contract | undefined {
  //   // obtenemos estado del signer (firmante)
  //   const signer = this.ethereumService.getSigner();
  //   console.log('signer', signer);

  //   if (!signer) {
  //     console.log('Need to be signed in to get contracts!');
  //     return;
  //   }

  //   // creamos instancia del smarcontract

  //   this.contract = new ethers.Contract(address, abi, signer);
  //   console.log('Contract loaded: ', this.contract);
  //   return this.contract; // Devuelve la instancia del contrato
  // }


  async getContract(address: string, abi: ethers.ContractInterface): Promise<ethers.Contract | undefined> {
    // obtenemos el signer
    const signer = await this.ethereumService.getSigner();

    console.log('signer', signer);

    if (!signer) {
      console.log('Need to be signed in to get contracts!');
      return;
    }

    // creamos la instancia del smart contract pasando address, abi y signer
    this.contract = new ethers.Contract(address, abi, signer);
    console.log('Contract loaded: ', this.contract);

    return this.contract; // Devuelve la instancia del contrato
  }


  async tranferFrom(addressFrom: string, addressTo: string, amount: number) {
    // Obtenemos el signer
    // const signer = await this.ethereumService.getSigner();
    // console.log('signer', signer);

    // llamamos a transferFrom del smart contract
    const transfer = await this.contract!['transferFrom'](
      // Dirección del remitente
      '0x7290F876e01923900082e243363b4c33677d3d8a',
      // Dirección del destinatario
      '0x63C0947437890352746162403D7639B683A48553',
      // Cantidad de tokens a transferir
      1000000000000000000

    );
  }


}
