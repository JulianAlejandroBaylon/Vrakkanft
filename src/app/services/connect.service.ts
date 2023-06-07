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

  async addMetaMaskEventListeners() {
    try {
      Blockchain.CheckConexion();
      Blockchain.RequestConexion();
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
    Blockchain.ConectWallet()
  }

  /*buy() {
    // Importa la biblioteca web3.js
    const Web3 = require('web3');

    // Conecta con MetaMask
    const web3 = new Web3(window.ethereum);

    // Escucha el evento de clic del botón de compra
    document
      .getElementById('botonCompra')
      .addEventListener('click', async () => {
        // Comprueba si MetaMask está conectado
        if (typeof web3 !== 'undefined') {
          // Pide permiso al usuario para acceder a su cuenta de MetaMask
          await window.ethereum.enable();

          // Crea una instancia del contrato utilizando la dirección del contrato
          const contrato = new web3.eth.Contract(ABI, contratoAddress);

          // Realiza la compra utilizando el método apropiado del contrato
          await contrato.methods
            .comprar()
            .send({ from: web3.eth.defaultAccount });
          console.log('Compra realizada correctamente');
        } else {
          console.log('MetaMask no está instalado');
        }
      });
  }*/

  constructor() {}
}
