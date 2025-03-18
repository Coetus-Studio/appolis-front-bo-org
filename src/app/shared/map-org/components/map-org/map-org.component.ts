import { Component, OnInit, signal } from '@angular/core';
import { GoogleMap } from '@angular/google-maps';
import { CommonModule } from '@angular/common';

declare var google: any; // Asegúrate de que Google esté disponible

@Component({
  selector: 'map-org',
  standalone: true,
  imports: [CommonModule, GoogleMap],
  templateUrl: './map-org.component.html',
  styleUrl: './map-org.component.css'
})
export default class MapOrgComponent implements OnInit {

  // coordenadas iniciales de carga del mapa
  center = signal<google.maps.LatLngLiteral>({ lat: -33.45694, lng: -70.64827 });
  zoom = signal<number>(10);
  display = signal<google.maps.LatLngLiteral | null>(null);

  // Opciones del mapa
  options: google.maps.MapOptions = {
    mapId: 'AIzaSyDggZWuCu532Dqp1KWDGy28_3GlRSiRfek', // Reemplaza con tu Map ID
    disableDefaultUI: true, // Desactiva controles por defecto (opcional)
    fullscreenControl: true,
  };

  ngOnInit(): void {
    this.initAutocomplete();
  }


  initAutocomplete() {
    console.log('initAutocomplete')
    const input = document.getElementById('autocomplete') as HTMLInputElement;
    const autocomplete = new google.maps.places.Autocomplete(input);

    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      if (place.geometry) {
        console.log('Lugar seleccionado:', place);
      }
    });
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
