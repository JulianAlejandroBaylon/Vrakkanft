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
  list_images = [
    'assets/images/2-3.webp',
    'assets/images/2-4.webp',
    'assets/images/2-5.webp',
    'assets/images/2-6.webp',
    'assets/images/2-7.webp',
    'assets/images/2-8.webp',
  ];

  PickImage = () => {
    let number = Math.random() * (this.list_images.length - 1) + 1;
    return this.list_images[Math.floor(number)];
  };
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
      this.Blockchain.TransformarToWei(this.valor),
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
