import { Component, ChangeDetectorRef } from '@angular/core';
import { ConnectService } from '../services/connect.service';


@Component({
  selector: 'app-vrk',
  templateUrl: './vrk.component.html',
  styleUrls: ['./vrk.component.css'],
})
export class VrkComponent {
  total;

  constructor (public connectService: ConnectService ){
    this.connectService.Total = this.total
  }


  conectWallet() {
    this.connectService.connectWallet()
    this.connectService.isConnected=true
}
}
