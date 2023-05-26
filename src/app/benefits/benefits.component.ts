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

  texto: any = {
    1: {
      title: 'Discounts and promotions',
      text: 'On the Vrakka Marketplace for products and courses.',
    },
    2:{
      title: 'Monetize',
      text: 'The amount of tokens you get in the app.',
    },
    3:{
      title: 'Access to Vrakka Academy',
      text: 'Learn more about crypto and new technologies.',
    },
    4:{
      title: 'Exclusive access to Vrk community',
      text: 'Attend exclusive events, find out before everyone else about the news and much more.',
    },
    5:{
      title: 'Access to Vrakka trading',
      text: 'Learn more about trading and investments.',
    },
    6:{
      title: 'Access to Vrakka Metaverse',
      text: 'Personal development workshops, coaches, nutritionists, and more services!',
    },
    7:{
      title: 'Rent and sale in APP',
      text: 'Earn passive tokens renting your NFT',
    },
    8:{
      title: 'Token private sales access',
      text: 'And future products within the ecosystem',
    },
    9:{
      title: 'Enhance ',
      text: 'The amount of tokens you get in the app.',
    },
    10:{
      title: 'Staking',
      text: 'Safeguard your NFT and get more VRK tokens. ',
    },
    11:{
      title: 'Access to Vrakka Gaming',
      text: 'Enjoy IQ games where you can bet and win more.',
    },
  };


  suma() {
    this.x++;
    if (this.x > 11) {
      this.x = 1;
    }
  }

  res() {
    this.x--;
    if (this.x < 1) {
      this.x = 11;
    }
  }
}
