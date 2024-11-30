import { Component, OnInit } from '@angular/core';

import { ContractService } from '../../../../shared/services/contract.service';
import { EthereumService } from '../../../../shared/services/etherum.service';

import TokenFarmAbi from '../../../../assets/contracts-data/TokenFarm.json';
import TokenFarmAddress from '../../../../assets/contracts-data/TokenFarm-address.json';

import StellartTokenAbi from '../../../../assets/contracts-data/StellartToken.json';
import StellartTokenAddress from '../../../../assets/contracts-data/StellartToken-address.json';

import AppolisTokenAbi from '../../../../assets/contracts-data/AppolisToken.json';
import AppolisTokenAddress from '../../../../assets/contracts-data/AppolisToken-address.json';

import { ethers } from 'ethers';



@Component({
  selector: 'staking-appolis-token',
  standalone: true,
  imports: [],
  templateUrl: './staking-appolis-token.component.html',
  styleUrl: './staking-appolis-token.component.css'
})
export default class StakingAppolisTokenComponent implements OnInit {

  private contractAppolis: ethers.Contract | undefined;
  private contractStellart: ethers.Contract | undefined;

  // private farmTokenAddress = TokenFarmAddress.address;
  // private farmTokenAbi = TokenFarmAbi;

  private stellartTokenAddress = StellartTokenAddress.address;
  private stellartTokenAbi = StellartTokenAbi;

  private appolisTokenAddress = AppolisTokenAddress.address;
  private appolisTokenAbi = AppolisTokenAbi;

  addressUser: string = '';
  balanceAppolisToken: string = '0';
  balanceStellartToken: number = 0;


  constructor(
    private contractService: ContractService,
    private ethereumService: EthereumService,
  ) { }


  async ngOnInit(): Promise<void> {
    // Obtengo el contrato y lo asigno a contract
    try {
      // suscripcion a userAddress
      this.ethereumService.userAddress$.subscribe(address => {
        this.addressUser = address;
      });

      this.contractAppolis = await this.contractService.getContract(this.appolisTokenAddress, this.appolisTokenAbi.abi);

      // this.contractStellart = await this.contractService.getContract(this.stellartTokenAddress, this.stellartTokenAbi.abi);

      if (this.contractAppolis) {
        // console.log('Contract loaded:', this.contract);
        // console.log('Contract address:', this.contract.address);

        this.getBalanceStaking();
      } else {
        console.log('Failed to load contract');
      }
    } catch (error) {
      console.error('Error getting contract:', error);
    }
  }

  async getBalanceStaking() {
    //TODO traer address user
    console.log('getBalance:', this.addressUser);

    const balance = await this.contractService.getBalance(this.addressUser);

    this.balanceAppolisToken = balance;

  }






}
