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
  content: String = "NFT"
  link: string

  constructor(
    public connectService: ConnectService,
    public Blockchain: Blockchain,
    private vrakkaNFT: ObjectVrakkaNFT
  ) {}
  async connectWallet() {
    await this.Blockchain.ConectWallet();
  }

  async privateMinting() {
    await this.vrakkaNFT.load();
    console.log(this.account);
    let res = await this.Blockchain.EsValido(this.account)

    if (res){
      let resu = await this.vrakkaNFT.privateMinting(
        this.account,
        this.valor.toString(),
        false
      );
      console.log(resu);
    }else{
      console.log("No es valido")
    }
    //let resu = await this.vrakkaNFT.mint()

  }

  Cambio(cambio: String){
    this.content=cambio
  }

  async setTokenUri(){
    await this.vrakkaNFT._setTokenURI(this.link);
  }

  async ngOnInit() {
    await this.vrakkaNFT.load();
    this.valor = await this.vrakkaNFT.getPrice();
    console.log(this.valor);
  }
}
