import { Component, input, Input, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

import { ContractService } from '../../../../shared/services/contract.service';


import AppolisTokenAbi from '../../../../assets/contracts-data/AppolisToken.json';
import AppolisTokenAddress from '../../../../assets/contracts-data/AppolisToken-address.json';

import StellartTokenAbi from '../../../../assets/contracts-data/StellartToken.json';
import StellartTokenAddress from '../../../../assets/contracts-data/StellartToken-address.json';

import TokenFarmAbi from '../../../../assets/contracts-data/TokenFarm.json';
import TokenFarmAddress from '../../../../assets/contracts-data/TokenFarm-address.json';
import { ethers } from 'ethers';
import { EthereumService } from '../../../../shared/services/etherum.service';
import AuthWalletComponent from '../../../../auth/components/auth-wallet/auth-wallet.component';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'balance-token',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './balance-token.component.html',
  styleUrl: './balance-token.component.css'
})
export default class BalanceTokenComponent implements OnInit {

  private contract: ethers.Contract | undefined;

  private appolisTokenAddress = AppolisTokenAddress.address;
  private appolisTokenAbi = AppolisTokenAbi;
  private stellartTokenAddress = StellartTokenAddress.address;
  private stellartTokenAbi = StellartTokenAbi;
  private farmTokenAddress = TokenFarmAddress.address;
  private farmTokenAbi = TokenFarmAbi;


  // public address = input<any>();
  // @Input() addressUser: string = '';
  public addressUser: string = '';

  // public addressUser: string = '';
  balance: string = '0';

  constructor(
    private contractService: ContractService,
    private ethereumService: EthereumService,
  ) { }

  async ngOnInit() {


    try {
      // suscripcion a userAddress
      this.ethereumService.userAddress$.subscribe(address => {
        this.addressUser = address;
      });

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

  // get connectedAddress() {
  //   console.log('Getting connected address...: ', this.newAddressUser);
  //   return this.newAddressUser;
  // }

  async getBalance() {
    //TODO traer address user
    console.log('getBalance:', this.addressUser);

    const balance = await this.contractService.getBalance(this.addressUser);

    this.balance = balance;

  }
}
