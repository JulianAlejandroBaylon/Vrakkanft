import { Component } from '@angular/core';
import Web3 from 'web3';
import { ConnectService } from './services/connect.service'
import { MoveDirection, OutMode, Container, Engine } from 'tsparticles-engine';
import { loadFull } from 'tsparticles';

declare var window: any;
const web3 = new Web3(window.ethereum);

/*window.ethereum.on('accountsChanged', (accounts: string[]) => {
  if (accounts.length > 0) {
    // El usuario ha conectado su cartera de MetaMask y hay al menos una cuenta disponible
    // Aquí puedes realizar acciones adicionales cuando se conecta la cartera
    console.log('Cartera de MetaMask conectada. Cuenta actual:', accounts[0]);
  } else {
    // El usuario ha desconectado su cartera de MetaMask
    // Aquí puedes realizar acciones adicionales cuando se desconecta la cartera
    console.log('Cartera de MetaMask desconectada');
  }
});*/

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor (public connectService: ConnectService ){}
  conectWallet(): void {
    web3.eth
      .requestAccounts()
      .then(async (accounts) => {
        // La conexión se realizó correctamente y tienes acceso a las cuentas del usuario.
        // Puedes utilizar las cuentas para realizar operaciones en Ethereum.
        // Obtener la dirección de la cuenta activa
        this.connectService.isConnected = true;
        const address = accounts[0];
        // Obtener el saldo de la cuenta en Ether
        const balanceWei = await web3.eth.getBalance(address);
        const balanceEther = web3.utils.fromWei(balanceWei, 'ether');

        console.log('Dirección de la cuenta:', address);
        console.log('Saldo de la cuenta:', balanceEther, 'ETH');
      })
      .catch((error) => {
        // Ocurrió un error al conectar con MetaMask o el usuario no autorizó la conexión.
      });
      if(this.connectService.isInstalled === false){
        window.open("https://metamask.app.link/dapp/vrakkanft.com/");
      }
  }

  //Id for particles of background
  id = 'tsparticles';
  activeLink: string = '';

  /*JavaScript object */
  particlesOptions = {
    fpsLimit: 60,
    particles: {
      color: {
        value: '#D899FF',
      },
      move: {
        direction: MoveDirection.none,
        enable: true,
        outModes: {
          default: OutMode.bounce,
        },
        random: false,
        speed: 1,
        straight: false,
      },
      number: {
        density: {
          enable: true,
          area: 800,
        },
        value: 80,
      },
      opacity: {
        value: {
          min: 0.1, // Valor mínimo de opacidad
          max: 0.5, // Valor máximo de opacidad
        },
        animation: {
          enable: true,
          speed: 1,
          minimumValue: 0.1,
          sync: false,
        },
      },
      shape: {
        type: 'circle',
      },
      size: {
        value: {
          min: 1,
          max: 5,
        },
        animation: {
          enable: true,
          speed: 3,
          minimumValue: 1,
          sync: false,
        },
      },
    },
    detectRetina: true,
  };

  particlesLoaded(container: Container): void {}

  async particlesInit(engine: Engine): Promise<void> {
    // Starting from 1.19.0 you can add custom presets or shape here, using the current tsParticles instance (main)
    // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
    // starting from v2 you can add only the features you need reducing the bundle size
    await loadFull(engine);
  }

  ngOnInit() {
    if (window.ethereum !== undefined) {
      this.connectService.isInstalled=true;
      console.log(window.ethereum)
    }else{
      alert('Bienvenido! para navegar en la pagina te recomendamos tener instalado Metamask para una mejor experiencia')
      this.connectService.isInstalled=false;
    }

    const p1 = document.querySelector('.one');
    const p2 = document.querySelector('.two');
    const p3 = document.querySelector('.three');
    const p4 = document.querySelector('.four');
    const p5 = document.querySelector('.five');
    const p6 = document.querySelector('.six');
    const p7 = document.querySelector('.seven');
    const p8 = document.querySelector('.eight');

    const carga = (entradas) => {
      /*console.log("entradas", entradas);
      console.log("observador", observador);*/

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
}
