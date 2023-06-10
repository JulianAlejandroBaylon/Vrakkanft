import { Component } from '@angular/core';

@Component({
  selector: 'app-benefits',
  templateUrl: './benefits.component.html',
  styleUrls: ['./benefits.component.css'],
})
export class BenefitsComponent {

  x: number = 1;
  item: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  img: string[] = [
    'assets/images/benefits3.webp',
    'assets/images/benefits1.webp',
    'assets/images/benefits4.webp',
    'assets/images/benefits2.webp',
    'assets/images/benefits7.webp',
    'assets/images/benefits6.webp',
    'assets/images/benefits5.webp',
    'assets/images/benefits8.webp',
    'assets/images/benefits9.webp',
    'assets/images/benefits10.webp',
    'assets/images/benefits11.webp',
  ];

  suma() {
    this.x++;
    if (this.x > 11) {
      this.x = 1;
    }
    console.log(this.x)
  }

  res() {
    this.x--;
    if (this.x < 1) {
      this.x = 11;
    }
    console.log(this.x)
  }
}
