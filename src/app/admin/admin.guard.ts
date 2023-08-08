import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';

import { Blockchain } from '../services/connect.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private blockchain: Blockchain, private router: Router) {}

  async canActivate(): Promise<boolean> {
    const expectedAddress = '0xaa924e98c7c99fabeff9f29f6a9b3a0c4afd7ca7'; // Dirección esperada
    const expectedAddress2 = '0xe246add08b38cf78f5e4ec57d8734e6dfdcfaa18';
    const connectedAddress = await this.blockchain.getAddress();

    if (connectedAddress == expectedAddress || connectedAddress == expectedAddress2) {
      return true; // Permite el acceso al componente
    } else {
      this.router.navigate(['/']); // Redirige a otra ruta si la dirección no coincide
      return false;
    }
  }
}
