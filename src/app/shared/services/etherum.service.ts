import { Injectable, NgZone, signal } from '@angular/core';
import { MetaMaskInpageProvider } from '@metamask/providers';
import { ethers, ContractFactory } from 'ethers';
import { BehaviorSubject } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class EthereumService {

  // Mantiene una instancia de Web3Provider de ethers.js, que se utiliza para interactuar con la red Ethereum.
  private provider: ethers.providers.Web3Provider | undefined;
  // mantiene el firmante actual (una instancia de JsonRpcSigner) y emite cambios a los suscriptores.
  private signer: BehaviorSubject<ethers.providers.JsonRpcSigner | undefined> = new BehaviorSubject<ethers.providers.JsonRpcSigner | undefined>(undefined);

  // TODO
  // behaviorSubject es una clase RxJS que emite valores a sus suscriptores. Requiere un valor inicial, en este caso string vacio
  private userAddressSubject = new BehaviorSubject<string>('');
  // crea una variable BehaviorSubject que emite el address del usuario y lo comparte con otros componentes que se suscriban
  userAddress$ = this.userAddressSubject.asObservable();

  constructor(private ngZone: NgZone) {

    if (typeof window.ethereum !== 'undefined') {
      // fuerza el tipo window.ethereum to MetaMaskInpageProvider
      const metaMaskProvider = window.ethereum as MetaMaskInpageProvider;
      this.provider = new ethers.providers.Web3Provider(metaMaskProvider as unknown as ethers.providers.ExternalProvider);
      this.signer.next(this.provider.getSigner());

      // Define a custom type for the accountsChanged event callback
      type AccountsChangedCallback = (accounts: string[]) => void;

      // Use the custom type for the callback
      (metaMaskProvider as any).on('accountsChanged', (accounts: unknown[]) => {
        const accountArray = accounts as string[];
        this.ngZone.run(() => {
          if (accountArray.length === 0) {
            this.handleMetaMaskDisconnect();
          } else {
            this.handleMetaMaskAccountsChanged(accountArray);
          }
        });
      });

    } else {
      console.error('MetaMask is not installed.');
    }
  }

  // Maneja la desconexión de MetaMask. Limpia el provider y signer
  private handleMetaMaskDisconnect() {
    console.log('MetaMask disconnected.');
    this.provider = undefined;
    this.signer.next(undefined);
  }

  // Maneja los cambios en la cuenta de MetaMask. Crea un nuevo provider y actualiza el signer
  private handleMetaMaskAccountsChanged(accounts: string[]) {
    console.log('MetaMask accounts changed:', accounts);
    const metaMaskProvider = window.ethereum as MetaMaskInpageProvider;
    this.provider = new ethers.providers.Web3Provider(metaMaskProvider as unknown as ethers.providers.ExternalProvider);
    this.signer.next(this.provider.getSigner());
  }

  async connectToMetaMaskWallet() {
    if (typeof window.ethereum !== 'undefined') {
      const metaMaskProvider = window.ethereum as MetaMaskInpageProvider;
      // Request access to the user's MetaMask account
      await window.ethereum.request({ method: 'eth_requestAccounts' });

      // Connect to MetaMask using the Web3Provider
      this.provider = new ethers.providers.Web3Provider(metaMaskProvider as unknown as ethers.providers.ExternalProvider);
      this.signer.next(this.provider.getSigner());

      // const address = await this.signer.getValue()!.getAddress();
      const address = await this.signer.getValue()!.getAddress();
      console.log('conectado a metamask: ', address)

      this.userAddressSubject.next(address);
    } else {
      console.error('MetaMask is not installed.');
    }

  }

  async metodosRandomProviderEthersJs() {
    const block = await this.provider?.getBlockNumber();
    console.log('Block Number:', block);
    const balance = await this.provider?.getBalance('0x028cA896C15D7c8DC2d2c03efe5f779DE590295a');
    console.log('Balance:', balance);
    const balance2 = ethers.utils.formatEther('0x028cA896C15D7c8DC2d2c03efe5f779DE590295a')
    console.log('Balance Ether:', balance2);
  }

  async getSigner(): Promise<ethers.providers.JsonRpcSigner | undefined> {
    return this.signer.getValue(); // Devuelve el signer en lugar de la dirección
  }

}

