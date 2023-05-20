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
    'assets/images/2-3.webp',
    'assets/images/2-4.webp',
    'assets/images/2-5.webp',
    'assets/images/2-6.webp',
    'assets/images/2-7.webp',
    'assets/images/2-8.webp',
    'assets/images/2-9.webp',
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
