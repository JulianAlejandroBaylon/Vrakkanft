import { Component } from '@angular/core';

@Component({
  selector: 'app-benefits',
  templateUrl: './benefits.component.html',
  styleUrls: ['./benefits.component.css']
})
export class BenefitsComponent {
  x: number = 1;
  item: number[] = [1, 2, 3, 4, 5, 6, 7];
  img: string[] = [
    'assets/benefits1.png',
    'assets/benefits2.png',
    'assets/benefits3.png',
    'assets/benefits4.png',
    'assets/benefits5.png',
    'assets/benefits6.png',
    'assets/benefits7.png'
  ];
  suma(): void {
    this.x++;
    if (this.x > 7) {
      this.x = 1;
    }
    console.log(this.x);
  }

  res(): void {
    this.x--;
    if (this.x < 1) {
      this.x = 7;
    }
    console.log(this.x);
  }
}
