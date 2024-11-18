import { Component, OnInit } from '@angular/core';
import { ContractService } from '../../../../shared/services/contract.service';
import { EthereumService } from '../../../../shared/services/etherum.service';
import { FormsModule } from '@angular/forms';

import AppolisTokenAbi from '../../../../assets/contracts-data/AppolisToken.json';
import AppolisTokenAddress from '../../../../assets/contracts-data/AppolisToken-address.json';
import { ethers } from 'ethers';
import { ErrorMessageComponent } from '../../components/error-message/error-message.component';

@Component({
  selector: 'app-transfer-token',
  standalone: true,
  imports: [ FormsModule, ErrorMessageComponent ],
  templateUrl: './transfer-token.component.html',
  styleUrl: './transfer-token.component.css'
})
export default class TransferTokenComponent implements OnInit {

  private contract: ethers.Contract | undefined;

  private appolisTokenAddress = AppolisTokenAddress.address;
  private appolisTokenAbi = AppolisTokenAbi;

  public addressUser: string = '';
  public toAddress: string = '';
  public amount: number = 0;
  public message: string | undefined;

  constructor(
    private contractService: ContractService,
    private ethereumService: EthereumService,
  ) {}

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

  async transferToken(addressUser: string, toAddress: string, amount: number) {
    try {
      console.log('fromAddress', addressUser)
      console.log('toAddress', toAddress)
      console.log('amount', amount)

      if (amount === 0) {
        console.log('No amount provided.')
        return;
      }
      const transfer = await this.contractService.transferFrom(addressUser, toAddress, amount);
      console.log('Transfer successful:', transfer);
    } catch (error) {
      console.error('Error transferring token:', error);
    }
  }


  async transfer(toAddress: string, amount: number) {
    try {
      const transfer = await this.contractService.transferTo(toAddress, amount);
      console.log('Transfer successful:', transfer);
      this.message = 'Transferencia realizada exitosamente!';

    } catch (error) {

    }
  }
}
