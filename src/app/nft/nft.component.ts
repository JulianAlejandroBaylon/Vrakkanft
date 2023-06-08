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
  connectWallet(){
    this.connectService.connectWallet()
    this.connectService.isConnected=true
  }
}
