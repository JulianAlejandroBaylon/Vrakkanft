
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

  onSeccionClick(seccion: string) {
    this.seccionClic.emit(seccion);
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
   this.connectService.isConnected = await this.blockchain.ConectWallet();
  }
  ngOnInit(){
   // blockchain.CheckConexion()
    this.connectService.observer();
  }
}
