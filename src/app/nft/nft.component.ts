import { Component } from '@angular/core';
import Web3 from 'web3';
import { ConnectService } from '../services/connect.service';

declare var window: any;
const web3 = new Web3(window.ethereum);

@Component({
  selector: 'app-nft',
  templateUrl: './nft.component.html',
  styleUrls: ['./nft.component.css'],
})
export class NftComponent {
  constructor (public connectService: ConnectService ){}
  connected = this.connectService.isConnected;
  conectWallet() {
    web3.eth
      .requestAccounts()
      .then(async (accounts) => {
        // La conexión se realizó correctamente y tienes acceso a las cuentas del usuario.
        // Puedes utilizar las cuentas para realizar operaciones en Ethereum.
        // Obtener la dirección de la cuenta activa
        const address = accounts[0];
        this.connectService.isConnected=true;
        // Obtener el saldo de la cuenta en Ether
        const balanceWei = await web3.eth.getBalance(address);
        const balanceEther = web3.utils.fromWei(balanceWei, 'ether');

        console.log('Dirección de la cuenta:', address);
        console.log('Saldo de la cuenta:', balanceEther, 'ETH');
      })
      .catch((error) => {
        // Ocurrió un error al conectar con MetaMask o el usuario no autorizó la conexión.
      });
      if(this.connectService.isInstalled === false){
        window.open("https://metamask.app.link/dapp/vrakkanft.com/");
      }
  }
}
