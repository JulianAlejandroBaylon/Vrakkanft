import { Component } from '@angular/core';
import Web3 from 'web3';
import { ConnectService } from '../services/connect.service';

declare var window: any;
const web3 = new Web3(window.ethereum);

/*
window.ethereum.on('accountsChanged', (accounts: string[]) => {
  if (accounts.length > 0) {
    // El usuario ha conectado su cartera de MetaMask y hay al menos una cuenta disponible
    // Aquí puedes realizar acciones adicionales cuando se conecta la cartera
    document.getElementById('conect2').classList.add('nel');
    document.getElementById('buy2').classList.add('nel');
    console.log('Cartera de MetaMask conectada. Cuenta actual:', accounts[0]);
  } else {
    // El usuario ha desconectado su cartera de MetaMask
    // Aquí puedes realizar acciones adicionales cuando se desconecta la cartera
    document.getElementById('conect2').classList.remove('nel');
    document.getElementById('buy2').classList.remove('nel');
    console.log('Cartera de MetaMask desconectada');
  }
});*/

@Component({
  selector: 'app-nft',
  templateUrl: './nft.component.html',
  styleUrls: ['./nft.component.css'],
})
export class NftComponent {
  constructor (public connectService: ConnectService ){}
  connectWallet(){
    this.connectService.connectWallet()
  }
}
