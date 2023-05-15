import { Component } from '@angular/core';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css'],
})
export class GalleryComponent {
  x: number = 1;
  item: number[] = [1, 2, 3, 4, 5, 6, 7];
  img: string[] = [
    'assets/2 3.png',
    'assets/2 4.png',
    'assets/2 5.png',
    'assets/2 6.png',
    'assets/2 7.png',
    'assets/2 8.png',
    'assets/2 9.png',
  ];

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
