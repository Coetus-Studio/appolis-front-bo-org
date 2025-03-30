import { Injectable } from '@angular/core';
declare var google: any;

@Injectable({
  providedIn: 'root',
})
export class GoogleMapsService {
  private map!: google.maps.Map;

  constructor() {}

  initMap(element: HTMLElement, options: google.maps.MapOptions) {
    this.map = new google.maps.Map(element, options);
  }

  setCenter(lat: number, lng: number) {
    this.map.setCenter(new google.maps.LatLng(lat, lng));
  }

  addMarker(position: google.maps.LatLngLiteral) {
    new google.maps.Marker({
      position: position,
      map: this.map,
    });
  }

  getMap() {
    return this.map;
  }
}
