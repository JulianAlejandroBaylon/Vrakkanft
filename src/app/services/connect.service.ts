import { Injectable } from '@angular/core';
import * as VrakkaNFT from '../../blockchain/VrakkaNFT.js';
import * as Blockchain from '../../blockchain/Blockchain.js'


@Injectable({
  providedIn: 'root',
})
export class ConnectService {
  isConnected: boolean = false;
  isInstalled: boolean = false;
  Total: number = 0;

  async addMetaMaskEventListeners() {
    try {
      Blockchain.CheckConexion();
      console.log(this.Total)

    } catch (error) {
      console.error('Error al conectar con MetaMask:', error);
    }
  }

  public connectWallet() {
    Blockchain.ConectWallet()
    Blockchain.RequestConexion();
  }

  buy() {

  }

  observer(){
    const p1 = document.querySelector('.one');
    const p2 = document.querySelector('.two');
    const p3 = document.querySelector('.three');
    const p4 = document.querySelector('.four');
    const p5 = document.querySelector('.five');
    const p6 = document.querySelector('.six');
    const p7 = document.querySelector('.seven');
    const p8 = document.querySelector('.eight');

    const carga = (entradas) => {
      entradas.forEach((entrada) => {
        if (entrada.isIntersecting) {
          entrada.target.classList.add('visible');
        } else {
          entrada.target.classList.remove('visible');
        }
      });
    };

    const observador = new IntersectionObserver(carga, {
      root: null,
      rootMargin: '0px',
      threshold: 0.5,
    });

    observador.observe(p1);
    observador.observe(p2);
    observador.observe(p3);
    observador.observe(p4);
    observador.observe(p5);
    observador.observe(p6);
    observador.observe(p7);
    observador.observe(p8);
  }

  constructor() {}
}
