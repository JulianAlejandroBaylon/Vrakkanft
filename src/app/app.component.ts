import { Component } from '@angular/core';
import * as AOS from 'aos';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'NFT';
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
