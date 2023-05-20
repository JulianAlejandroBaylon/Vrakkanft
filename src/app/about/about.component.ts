import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {

  ran: number [] = [0, 1, 2, 3, 4, 5, 6]

  title: string [] = [
    'Yericko Vielmas',
    'Roberto Mejia',
    'Saul Dominguez',
    'Eduardo Muñoz',
    'Yannick Vielmas',
    'Raul Peinado',
    'Nancy Altamirano'
  ]

  text: string[]=[
    'CEO & founder',
    'text',
    'text',
    'text',
    'CAO',
    'COO',
    'text'
  ]

  fotos: string []=[
    'assets/yeri 1.png',
    'assets/Robert.png',
    'assets/Saul.png',
    'assets/Eduardo.png',
    'assets/Yanncik.png',
    'assets/Raul.png',
    'assets/Nancy.png'
  ]
}
