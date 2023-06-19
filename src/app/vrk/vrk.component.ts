import { Blockchain, ObjectICO } from './../services/connect.service';
import { Component, ChangeDetectorRef } from '@angular/core';
import { ConnectService } from '../services/connect.service';

@Component({
  selector: 'app-vrk',
  templateUrl: './vrk.component.html',
  styleUrls: ['./vrk.component.css'],
})
export class VrkComponent {
  //ICO = new ObjectICO();
  //token = new ObjectVrakkaNFT();

  total: number;

  constructor(public connectService: ConnectService, private ICO: ObjectICO, private blockchain: Blockchain) {}

  async conectWallet() {
    this.connectService.isConnected = await this.blockchain.ConectWallet();
  }

  async buy() {
    let id = this.blockchain.dameCurrentChain();
    console.log(id)
    await this.ICO.load();
    await this.ICO.mint(this.total);
  }
  ngOnInit() {
    // vrkTkn.ObjectToken.load();
  }
}
