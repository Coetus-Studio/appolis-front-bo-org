import { CommonModule, NgClass, NgFor } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { environment } from '../../../../../environments/environment';


@Component({
  selector: 'carousel-images-requirement',
  standalone: true,
  imports: [ NgClass, CommonModule ],
  templateUrl: './carousel-images.component.html',
  styleUrl: './carousel-images.component.css'
})
export class CarouselImagesComponent implements OnInit {

  @Input() images: { url: string }[] = [];

  cloudImages: { url: string}[] = [];

  // images2: string[] = [];
  currentIndex = 0;

  constructor() {
    // console.log("CarouselImagesComponent");
  }
  ngOnInit(): void {
    console.log("images: ", this.images)

    // inicializo imagenes y asocio nuevo domionio
    if (this.images) {
      this.images = this.images.map((img: any) => ({
        ...img,
        url: this.getImageUrl(img.key)
      }))

    }
    this.cloudImages = this.images;

    console.log("this images 2", this.images)

  }

  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
  }

  prevSlide() {
    this.currentIndex =
      (this.currentIndex - 1 + this.images.length) % this.images.length;
  }

  goToSlide(index: number) {
    this.currentIndex = index;
  }

/*   getImageUrl(key: string): string {
    const cloudFrontDomain = 'https://dkxczlv26qkds.cloudfront.net'; // Actualiza con tu dominio de CloudFront
    return `${cloudFrontDomain}/${key}`;
  } */

    getImageUrl(key: string): string {
      const cloudFrontDomain = environment.cloudfrontDomain; // Reemplaza con tu dominio de CloudFront
      return `${cloudFrontDomain}/${key}`;
    }

}
