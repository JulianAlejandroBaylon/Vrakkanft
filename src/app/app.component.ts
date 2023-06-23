
import { ConnectService } from './services/connect.service';
import { Component } from '@angular/core';
import { MoveDirection, OutMode, Container, Engine } from 'tsparticles-engine';
import { loadFull } from 'tsparticles';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {

  currentSectionIndex: number = 0;
  constructor(private connectService: ConnectService) {}

  indice = 0; // Inicializa el índice en 0
  saltosMaximos = 1; // Establece la cantidad máxima de secciones que se pueden saltar en un solo desplazamiento
  timerId: any; // Variable para almacenar el ID del temporizador

  async ngOnInit() {
    document.addEventListener('wheel', (event) => {
      const delta = Math.sign(event.deltaY);

      clearTimeout(this.timerId); // Cancela el temporizador anterior, si existe

      // Establece un nuevo temporizador para controlar la frecuencia del evento
      this.timerId = setTimeout(() => {
        // Controla la cantidad de secciones que se saltan en un solo desplazamiento
        if (delta > 0 && this.indice < 7) {
          this.indice = Math.min(this.indice + this.saltosMaximos, 7);
        } else if (delta < 0 && this.indice > 0) {
          this.indice = Math.max(this.indice - this.saltosMaximos, 0);
        }

        const secciones = document.getElementsByClassName('slide-H'); // Obtén todas las secciones con la clase 'slide'
        const seccionActual = secciones[this.indice];

        if (seccionActual) {
          seccionActual.scrollIntoView({ behavior: 'smooth' });
        }
      },80); // Ajusta el valor del retraso (en milisegundos) según tus necesidades
    });

  }

  cambiarIndice(seccion: string) {
    const secciones = ['home', 'vrk', 'NFT', 'benefits', 'types', 'gallery', 'roadmaps', 'about'];
    const indice = secciones.indexOf(seccion);

    if (indice !== -1) {
      this.indice = indice;

      const seccionActual = document.getElementsByClassName('slide-H')[this.indice];
      if (seccionActual) {
        seccionActual.scrollIntoView({ behavior: 'smooth' });
      }
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
}
