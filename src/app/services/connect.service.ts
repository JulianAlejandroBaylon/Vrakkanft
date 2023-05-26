import { Injectable } from '@angular/core';
import Web3 from 'web3';

declare let window: any;
const web3 = new Web3(window.ethereum);

@Injectable({
  providedIn: 'root',
})
export class ConnectService {
  isConnected: boolean = false;
  isInstalled: boolean = false;

  async addMetaMaskEventListeners() {
    try {
      await this.checkConnection();
      this.isInstalled = true;
      this.setupAccountsChangedListener();
      this.setupDisconnectListener();
    } catch (error) {
      console.error('Error al conectar con MetaMask:', error);
    }
  }

  private async checkConnection() {
    const accounts = await window.ethereum.request({ method: 'eth_accounts' });
    if (accounts.length > 0) {
      const currentAccount = accounts[0];
      console.log('Dirección de la cuenta:', currentAccount);
      this.isConnected = true;
    } else {
      console.log('Cartera de MetaMask desconectada');
      this.isConnected = false;
    }
  }

  private setupAccountsChangedListener() {
    window.ethereum.on('accountsChanged', (accounts: string[]) => {
      if (accounts.length > 0) {
        this.isConnected = true;
        console.log('Cuenta de MetaMask cambiada:', accounts[0]);
      } else {
        this.isConnected = false;
        console.log('Cartera de MetaMask desconectada');
      }
    });
  }

  private setupDisconnectListener() {
    window.ethereum.on('disconnect', (error: any) => {
      this.isConnected = false;
      this.isInstalled = true;
      console.log('Cartera de MetaMask desconectada');
    });
  }

  public connectWallet() {
    web3.eth
      .requestAccounts()
      .then(async (accounts) => {
        const address = accounts[0];
        this.isConnected = true;
        this.isInstalled = true;

        const balanceWei = await web3.eth.getBalance(address);
        const balanceEther = web3.utils.fromWei(balanceWei, 'ether');

        console.log('Dirección de la cuenta:', address);
        console.log('Saldo de la cuenta:', balanceEther, 'ETH');
      })
      .catch((error) => {
        console.error('Error al conectar con MetaMask o el usuario no autorizó la conexión:', error);
      });

    if (!this.isInstalled) {
      window.open('https://metamask.io/download/');
    }

    console.log(this.isConnected);
  }

  constructor() {}
}
