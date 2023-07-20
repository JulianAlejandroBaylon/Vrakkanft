import { Blockchain, ObjectICO } from './../services/connect.service';
import { Component, ChangeDetectorRef } from '@angular/core';
import { ConnectService } from '../services/connect.service';

@Component({
  selector: 'app-vrk',
  templateUrl: './vrk.component.html',
  styleUrls: ['./vrk.component.css'],
})
export class VrkComponent {
  total: number;

  constructor(
    public connectService: ConnectService,
    private ICO: ObjectICO,
    public blockchain: Blockchain
  ) {}

  async conectWallet() {
     await this.blockchain.ConectWallet();
  }

  async buy() {
    let id = await this.blockchain.dameCurrentChain();
    console.log(id);
    await this.ICO.load();
    await this.ICO.mint(this.total);
  }
  async ngOnInit() {
    // vrkTkn.ObjectToken.load();
    let id = await this.blockchain.dameCurrentChain();
    console.log(id);
  }
}
