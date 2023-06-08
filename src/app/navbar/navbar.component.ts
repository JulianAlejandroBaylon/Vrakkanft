import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ConnectService } from '../services/connect.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  idioma=false;
  constructor(
    public connectService: ConnectService,
    private translateService: TranslateService) {
      this.translateService.setDefaultLang('en');
  }

  changeLanguage() {
    this.idioma=!this.idioma;
      this.translateService.use(this.idioma ? 'es' : 'en')
  }

  conectWallet(): void {
    this.connectService.connectWallet();
  }
  ngOnInit(){
    this.connectService.addMetaMaskEventListeners();
  }
}
