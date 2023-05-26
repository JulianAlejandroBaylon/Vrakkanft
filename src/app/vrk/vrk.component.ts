import { Component, ChangeDetectorRef } from '@angular/core';
import Web3 from 'web3';
import { ConnectService } from '../services/connect.service';

declare var window: any;
const web3 = new Web3(window.ethereum);
/*
window.ethereum.on('accountsChanged', (accounts: string[]) => {
  if (accounts.length > 0) {
    // El usuario ha conectado su cartera de MetaMask y hay al menos una cuenta disponible
    // Aquí puedes realizar acciones adicionales cuando se conecta la cartera
    document.getElementById('conect').classList.add('disable');
    document.getElementById('buy').classList.add('disable');
    document.getElementById('cantidad').classList.add('disable');
    console.log('Cartera de MetaMask conectada. Cuenta actual:', accounts[0]);
  } else {
    // El usuario ha desconectado su cartera de MetaMask
    // Aquí puedes realizar acciones adicionales cuando se desconecta la cartera
    document.getElementById('conect').classList.remove('disable');
    document.getElementById('buy').classList.remove('disable');
    document.getElementById('cantidad').classList.remove('disable');
    console.log('Cartera de MetaMask desconectada');
  }
});*/

@Component({
  selector: 'app-vrk',
  templateUrl: './vrk.component.html',
  styleUrls: ['./vrk.component.css'],
})
export class VrkComponent {
  constructor (public connectService: ConnectService ){}

  conectWallet() {
    this.connectService.connectWallet()
}
}
