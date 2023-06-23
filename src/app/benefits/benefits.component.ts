import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-benefits',
  templateUrl: './benefits.component.html',
  styleUrls: ['./benefits.component.css'],
})
export class BenefitsComponent implements OnInit {
  images: string[] = [
    'assets/images/benefits1.webp',
    'assets/images/benefits2.webp',
    'assets/images/benefits3.webp',
    'assets/images/benefits4.webp',
    'assets/images/benefits5.webp',
    'assets/images/benefits6.webp',
    'assets/images/benefits7.webp',
    'assets/images/benefits8.webp',
    'assets/images/benefits9.webp',
    'assets/images/benefits10.webp',
    'assets/images/benefits11.webp',
    'assets/images/benefits12.webp',
  ];

  currentIndex: number = 0;
  visibleImages: string[] = [];
  x: number = 1;
  item: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

  ngOnInit() {
    this.updateVisibleImages();
  }

  updateVisibleImages() {
    const startIndex = this.currentIndex;
    const endIndex = this.currentIndex + 5;

    if (endIndex <= this.images.length) {
      this.visibleImages = this.images.slice(startIndex, endIndex);
    } else {
      const remaining = endIndex - this.images.length;
      this.visibleImages = this.images.slice(startIndex).concat(this.images.slice(0, remaining));
    }
  }


  previousSlide() {
    this.currentIndex--;
    if (this.currentIndex < 0) {
      this.currentIndex = this.images.length - 1;
    }
    this.updateVisibleImages();
    this.suma()
  }

  nextSlide() {
    this.currentIndex++;
    if (this.currentIndex >= this.images.length) {
      this.currentIndex = 0;
    }
    this.updateVisibleImages();
    this.res()
  }

  suma() {
    this.x++;
    if (this.x > 12) {
      this.x = 1;
    }
    console.log(this.x)
  }

  res() {
    this.x--;
    if (this.x < 1) {
      this.x = 12;
    }
    console.log(this.x)
  }
}
