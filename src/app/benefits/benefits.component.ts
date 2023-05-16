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
    'assets/benefits3.png',
    'assets/benefits1.png',
    'assets/benefits4.png',
    'assets/benefits2.png',
    'assets/benefits7.png',
    'assets/benefits6.png',
    'assets/benefits5.png',
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
