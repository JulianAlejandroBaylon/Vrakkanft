import { Component } from '@angular/core';
import { MoveDirection, ClickMode, HoverMode, OutMode, Container, Engine } from "tsparticles-engine";
import { loadFull } from "tsparticles";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
    title = 'NFT';
    //Id for particles of background
    id = "tsparticles";

    /*JavaScript object */
    particlesOptions = {

        fpsLimit: 120,
        particles: {
            color: {
                value: "#ffffff",
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
            opacity: {value: {
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
                type: "circle",
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

    particlesLoaded(container: Container): void {
        console.log(container);
    }

    async particlesInit(engine: Engine): Promise<void> {
        console.log(engine);

        // Starting from 1.19.0 you can add custom presets or shape here, using the current tsParticles instance (main)
        // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
        // starting from v2 you can add only the features you need reducing the bundle size
        await loadFull(engine);
    }

  ngOnInit() {
    function reveal() {
      var slides = document.querySelectorAll('.two');
      var container = document.querySelector('.page-content'); /*Todo el contenido de la pag*/
      var containerScrollTop = container.scrollTop; /*Valor del scroll vertical (En nuesttro caso horizontal)*/
      var containerWidth = container.clientWidth; /* Tamaño de la pagina */

      for (var i = 0; i < slides.length; i++) {
        var slide = slides[i]; /* Guarda la pagina*/
        var slideLeft = slide.clientLeft - containerScrollTop;
        var slideRight = slideLeft + slide.clientWidth;
        var isVisible = slideLeft < containerWidth && slideRight < 100 && slideRight > -800;

        if (isVisible) {
          slide.classList.add('active');
        } else {
          slide.classList.remove('active');
        }
      }
      console.log("containerWidth", slideRight);
    }

    var container = document.querySelector('.page-content');
    container.addEventListener('scroll', reveal);
  }
}
