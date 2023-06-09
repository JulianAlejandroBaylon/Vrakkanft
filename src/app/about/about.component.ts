import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {

  ran: number [] = [0, 1, 2, 3, 4, 5]

  title: string [] = [
    'Yericko Vielmas',
    'Roberto Mejia',
    'Saul Dominguez',
    'Yannick Vielmas',
    'Raul Peinado',
    'Nancy Altamirano'
  ]

  text: string[]=[
    'CEO & founder',
    'CTO',
    'CFO',
    'CDO',
    'COO',
    'text'
  ]

  fotos: string []=[
    'assets/images/yeri 1.webp',
    'assets/images/Robert.webp',
    'assets/images/Saul.webp',
    'assets/images/Yanncik.webp',
    'assets/images/Raul.webp',
    'assets/images/nancy.webp'
  ]
}
