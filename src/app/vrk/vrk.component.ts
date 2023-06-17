import { Component, ChangeDetectorRef } from '@angular/core';
import * as blockchain from '../../blockchain/Blockchain.js';
import { ObjectVrakkaNFT } from '../../blockchain/VrakkaNFT.js';
import { ConnectService } from '../services/connect.service';
import { ObjectICO } from '../../blockchain/ICO.js';

@Component({
  selector: 'app-vrk',
  templateUrl: './vrk.component.html',
  styleUrls: ['./vrk.component.css'],
})
export class VrkComponent {
  ICO = new ObjectICO();
  token = new ObjectVrakkaNFT();

  total: number;

  constructor(public connectService: ConnectService) {}

  async conectWallet() {
    this.connectService.isConnected = await blockchain.ConectWallet();
  }

  async buy() {
    let id = blockchain.dameCurrentChain();
    console.log(id)
    await this.ICO.load();
    await this.ICO.mint(this.total);
  }
  ngOnInit() {
    // vrkTkn.ObjectToken.load();
  }
}
