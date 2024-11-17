import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';


import { Fragment } from 'ethers/lib/utils';
import { Contract, ethers } from 'ethers';

import { ContractService } from '../../../../shared/services/contract.service';
import { EthereumService } from '../../../../shared/services/etherum.service';
/* import marketplace from '../../../../assets/contracts-data/Marketplace-address.json'
import Marketplace from '../../../../assets/contracts-data/Marketplace.json';
import nFT from '../../../../assets/contracts-data/NFT-address.json';
import NFT from '../../../../assets/contracts-data/NFT.json'; */


import AppolisTokenAbi from '../../../../assets/contracts-data/AppolisToken.json';
import AppolisTokenAddress from '../../../../assets/contracts-data/AppolisToken-address.json';

import StellartTokenAbi from '../../../../assets/contracts-data/StellartToken.json';
import StellartTokenAddress from '../../../../assets/contracts-data/StellartToken-address.json';

import TokenFarmAbi from '../../../../assets/contracts-data/TokenFarm.json';
import TokenFarmAddress from '../../../../assets/contracts-data/TokenFarm-address.json';

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

/*   private contractAddress = marketplace.address;
  private nftAddress = nFT.address; */

  private appolisTokenAddress = AppolisTokenAddress.address;
  private appolisTokenAbi = AppolisTokenAbi;

  private stellartTokenAddress = StellartTokenAddress.address;
  private stellartTokenAbi = StellartTokenAbi;

  private farmTokenAddress = TokenFarmAddress.address;
  private farmTokenAbi = TokenFarmAbi;


  addressUser: string = '';

  constructor(
    private contractService: ContractService,
    private ethereumService: EthereumService,

  ) { }


  async ngOnInit() {

    // console.log('contractAddress ', this.contractAddress);
    // console.log('nftAddress', this.nftAddress);

    // Obtengo el contrato y lo asigno a contract
    try {
      this.contract = await this.contractService.getContract(this.appolisTokenAddress, this.appolisTokenAbi.abi);

      if (this.contract) {
        // console.log('Contract loaded:', this.contract);
        // console.log('Contract address:', this.contract.address);

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
    const amount = 10; // Cambia esto al monto de tokens que deseas comprar

    console.log('contract 3', this.contract)

    // instancio la funcion del smart contract
    // let contractFunction = this.contract?.functions['transferFrom'];

    const addressFrom = '0x028cA896C15D7c8DC2d2c03efe5f779DE590295a';

    const addressTo = '0x347699eC786C516AB007ffDEC0b9409a324cf007';


    // this.getBalance();

    console.log('Funcion transfer from')
    const transfer = this.contractService.transferFrom(addressFrom, addressTo, amount);

    return transfer;

  }
}
