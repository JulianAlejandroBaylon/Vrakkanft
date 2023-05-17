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
      var slides = document.querySelectorAll(".slides > .slide");
      var container = document.querySelector(".page-content");
      var containerScrollLeft = container.scrollLeft;
      var containerWidth = container.clientWidth;

      for (var i = 0; i < slides.length; i++) {
        var slide = slides[i];
        var slideLeft = slide.clientLeft - containerScrollLeft;
        var slideRight = slideLeft + slide.clientWidth;
        var isVisible = (slideLeft < containerWidth && slideRight > 0);

        if (isVisible) {
          slide.classList.add("active");
        } else {
          slide.classList.remove("active");
        }
      }
    }

    var container = document.querySelector(".page-content");
    container.addEventListener("scroll", reveal);
  }


}
