import { Component } from '@angular/core';
import { ConnectService, Blockchain, ObjectVrakkaNFT } from '../services/connect.service';


@Component({
  selector: 'app-nft',
  templateUrl: './nft.component.html',
  styleUrls: ['./nft.component.css'],
})
export class NftComponent {

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
  constructor(public connectService: ConnectService, private Blockchain: Blockchain, private vrakkaNFT: ObjectVrakkaNFT) {}
  async connectWallet() {
    this.connectService.isConnected = await this.Blockchain.ConectWallet();
  }

  async buy() {
    let image = this.PickImage();
    await this.vrakkaNFT.load();
    let _price='1'
    let resu = await this.vrakkaNFT.mint(_price, image);
    let _total=await this.vrakkaNFT.total()
  }

  async ngOnInit(){
    await this.vrakkaNFT.load();
    console.log(this.vrakkaNFT.getPrice())
  }
}
