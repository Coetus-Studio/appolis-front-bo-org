import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

import { ContractService } from '../../../../shared/services/contract.service';
import { EthereumService } from '../../../../shared/services/etherum.service';
import marketplace from '../../../../assets/contracts-data/Marketplace-address.json'
import Marketplace from '../../../../assets/contracts-data/Marketplace.json';
import nFT from '../../../../assets/contracts-data/NFT-address.json';
import NFT from '../../../../assets/contracts-data/NFT.json';

import { Fragment } from 'ethers/lib/utils';
import { Contract, ethers } from 'ethers';



@Component({
  selector: 'app-buy-token',
  standalone: true,
  imports: [RouterLink, RouterOutlet, CommonModule ],
  templateUrl: './buy-token.component.html',
  styleUrl: './buy-token.component.css'
})
export default class BuyTokenComponent implements OnInit{

  // contract: any;
  private contract: ethers.Contract | undefined;

  private contractAddress = marketplace.address;

  private nftAddress = nFT.address;

  constructor(
    private contractService: ContractService,
    private ethereumService: EthereumService,

  ) { }


  async ngOnInit() {

    console.log('contractAddress ', this.contractAddress);
    console.log('nftAddress', this.nftAddress);

    // Obtengo el contrato y lo asigno a contract
    try {
      this.contract = await this.contractService.getContract(this.nftAddress, NFT.abi);

      if (this.contract) {
        console.log('Contract loaded:', this.contract);
        console.log('Contract address:', this.contract.address);
      } else {
        console.log('Failed to load contract');
      }
    } catch (error) {
      console.error('Error getting contract:', error);
    }
  }

  async getFeeAccount() {

  }

  async buyToken() {
    const amount = 1000; // Cambia esto al monto de tokens que deseas comprar

    console.log('contract 3', this.contract)

    // instancio la funcion del smart contract
    // let contractFunction = this.contract?.functions['transferFrom'];

    const addressFrom = '0x7290F876e01923900082e243363b4c33677d3d8a';
    const addressTo = '0x7290F876e01923900082';

    const transfer = this.contractService.tranferFrom(addressFrom, addressTo, amount);
    // console.log('contractFunction', contractFunction)

    // console.log('buyToken', amount);


  }
}
