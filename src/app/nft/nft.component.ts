import { Component } from '@angular/core';
import Web3 from 'web3';

declare var window: any;
const web3 = new Web3(window.ethereum);

@Component({
  selector: 'app-nft',
  templateUrl: './nft.component.html',
  styleUrls: ['./nft.component.css'],
})
export class NftComponent {
  conectWallet() {
    let isConnected = false;
    let isInstall = true;

    if (web3 !== undefined) {
      try {
        web3.eth.requestAccounts().then(async (accounts) => {
          if (accounts.length != 0) {
            isConnected = true;
            console.log("isConnected= ", isConnected)
          }
        });
      } catch (error) {}
    } else {
      isInstall = false;
    }
    if (isConnected=true) {
      document.getElementById('conect2').classList.add('nel');
      document.getElementById('buy2').classList.add('nel');
    } else {
      document.getElementById('conect2').classList.remove('nel');
      document.getElementById('buy2').classList.remove('nel');
    }

    if(isInstall=false){
      window.open("https://metamask.io/download/");
    }
    return { connect: isConnected, install: isInstall };
  }
}
