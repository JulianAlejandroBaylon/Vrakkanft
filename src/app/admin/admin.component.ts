import { Component } from '@angular/core';
import {
  ConnectService,
  Blockchain,
  ObjectVrakkaNFT,
} from '../services/connect.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  valor: any;
  account: String;

  constructor(
    public connectService: ConnectService,
    public Blockchain: Blockchain,
    private vrakkaNFT: ObjectVrakkaNFT
  ) {}
  async connectWallet() {
    await this.Blockchain.ConectWallet();
  }

  async buy() {
    await this.vrakkaNFT.load();
    this.account = this.vrakkaNFT.account;
    console.log(this.account);
    //let resu = await this.vrakkaNFT.mint()
    let resu = await this.vrakkaNFT.privateMinting(
      this.account,
      this.Blockchain.TransformarToWei(this.valor.toString()),
      false
    );
    console.log(resu);
  }

  async ngOnInit() {
    await this.vrakkaNFT.load();
    this.valor = await this.vrakkaNFT.getPrice();
    this.valor = this.Blockchain.TransformWei(this.valor);
    console.log(this.valor);
  }
}
