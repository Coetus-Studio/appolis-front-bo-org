import { Component, OnInit, signal } from '@angular/core';
import { GoogleMap } from '@angular/google-maps';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'map-org',
  standalone: true,
  imports: [CommonModule, GoogleMap],
  templateUrl: './map-org.component.html',
  styleUrl: './map-org.component.css'
})
export default class MapOrgComponent implements OnInit {

  center = signal<google.maps.LatLngLiteral>({ lat: -33.45694, lng: -70.64827 });
  zoom = signal<number>(10);
  display = signal<google.maps.LatLngLiteral | null>(null);

  // Opciones del mapa
  options: google.maps.MapOptions = {
    mapId: 'YOUR_MAP_ID', // Reemplaza con tu Map ID
    disableDefaultUI: true, // Desactiva controles por defecto (opcional)
    fullscreenControl: true,
  };

  ngOnInit(): void {
    // No se necesita inicializar locaciones ni otros datos aquí
  }

  // Método para mover el mapa
  moveMap(event: google.maps.MapMouseEvent) {
    if (event.latLng) {
      this.center.set(event.latLng.toJSON());
    } else {
      console.error('Invalid event:', event);
    }
  }

  // este metodo es mejor porque el control lo tiene uno
  move(event: google.maps.MapMouseEvent) {
    if (event.latLng) {
      this.display.set(event.latLng.toJSON());
    }
  }


}
