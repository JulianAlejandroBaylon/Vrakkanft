
import { Component, EventEmitter, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ConnectService, Blockchain } from '../services/connect.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  @Output() seccionClic = new EventEmitter<string>();

  onSeccionClick(seccion: number) {

   this.connectService.indice=seccion
  }

  idioma=false;
  constructor(
    public connectService: ConnectService,
    private translateService: TranslateService,
    private blockchain: Blockchain
    ) {
      this.translateService.setDefaultLang('en');
  }

  changeLanguage() {
    this.idioma=!this.idioma;
      this.translateService.use(this.idioma ? 'es' : 'en')
  }

  async connectWallet() {
   await this.blockchain.ConectWallet();
  }
  async ngOnInit(){
    this.onSeccionClick(this.connectService.indice)
    this.blockchain.CheckConexion()
    this.blockchain.turnOnAccountChange()
    const cuenta = await this.blockchain.getAddress();
    console.log(cuenta)
  }
}
