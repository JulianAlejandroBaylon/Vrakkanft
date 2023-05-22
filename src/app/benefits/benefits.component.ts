import { Component } from '@angular/core';

@Component({
  selector: 'app-benefits',
  templateUrl: './benefits.component.html',
  styleUrls: ['./benefits.component.css'],
})
export class BenefitsComponent {
  x: number = 1;
  item: number[] = [1, 2, 3, 4, 5, 6, 7];
  img: string[] = [
    'assets/images/benefits3.webp',
    'assets/images/benefits1.webp',
    'assets/images/benefits4.webp',
    'assets/images/benefits2.webp',
    'assets/images/benefits7.webp',
    'assets/images/benefits6.webp',
    'assets/images/benefits5.webp',
  ];

  texto: any = {
    1: {
      title: 'Staking',
      text: 'Safeguard your NFT and get more VRK tokens. ',
    },
    2:{
      title: 'Access to Vrakka Gaming',
      text: '',
    },
    3:{
      title: 'Discounts and promotions',
      text: 'On the Vrakka Marketplace for products and courses.',
    },
    4:{
      title: 'Access to Vrakka Metaverse',
      text: 'Personal development workshops, coaches, nutritionists, and more services!',
    },
    5:{
      title: 'Exclusive access to Vrk community',
      text: 'Attend exclusive events, find out before everyone else about the news and much more. ',
    },
    6:{
      title: 'Token private sales access',
      text: 'And future products within the ecosystem',
    },
    7:{
      title: 'Enhance ',
      text: 'The amount of tokens you get in the app.',
    },
  };

  suma(): void {
    this.x++;
    if (this.x > 7) {
      this.x = 1;
    }
  }

  res(): void {
    this.x--;
    if (this.x < 1) {
      this.x = 7;
    }
  }
}
