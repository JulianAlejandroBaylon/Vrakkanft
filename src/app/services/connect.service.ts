import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConnectService {
  isConnected = false;
  isInstalled = false;
  static isConnected: boolean;

  constructor() { }
}
