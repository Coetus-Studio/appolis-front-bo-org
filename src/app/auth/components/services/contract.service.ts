import { Injectable } from '@angular/core';
import { ethers } from 'ethers';
import { EthereumService } from './etherum.service';
// import { EthereumService } from './ethereum.service';

@Injectable({
  providedIn: 'root'
})
export class ContractService {

  public contract: ethers.Contract | undefined;

  constructor(private ethereumService: EthereumService) {}

  getContract(address: string, abi: ethers.ContractInterface) {
    const signer = this.ethereumService.getSigner();

    if (!signer) {
      console.log('Need to be signed in to get contracts!');
      return;
    }

    this.contract = new ethers.Contract(address, abi);
  }

}
