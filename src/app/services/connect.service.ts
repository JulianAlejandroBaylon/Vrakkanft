import { Injectable } from '@angular/core';
import Web3 from 'web3';
import * as VrakkaNFT from '../../blockchain/VrakkaNFT.js';
import * as Blockchain from '../../blockchain/Blockchain.js'

declare let window: any;
const web3 = new Web3(window.ethereum);

@Injectable({
  providedIn: 'root',
})
export class ConnectService {
  isConnected: boolean = false;
  isInstalled: boolean = false;
  Total: number = 0;

  async addMetaMaskEventListeners() {
    try {
      Blockchain.CheckConexion();
      console.log(this.Total)

    } catch (error) {
      console.error('Error al conectar con MetaMask:', error);
    }
  }

  public connectWallet() {
    Blockchain.ConectWallet()
    Blockchain.RequestConexion();
  }

  buy() {

  }

  constructor() {}
}
