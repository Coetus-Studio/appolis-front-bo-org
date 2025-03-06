import { Component, inject, OnInit, signal } from '@angular/core';
import { GoogleMap, MapAdvancedMarker } from '@angular/google-maps';
import { toSignal } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';

import { Location } from '../../interfaces/locations.interface';
import { LocationsService } from '../../services/locations.service';

@Component({
  selector: 'app-locations',
  standalone: true,
  imports: [CommonModule, GoogleMap, MapAdvancedMarker],
  templateUrl: './locations.component.html',
  styleUrl: './locations.component.css'
})
export default class LocationsComponent implements OnInit {

  // forma nativa de agregar atributos privados
  // readonly #locationsService = inject(LocationsService);

  center = signal<google.maps.LatLngLiteral>({ lat: -33.45694, lng: -70.64827 });
  zoom = signal<number>(10);
  display = signal<google.maps.LatLngLiteral | null>(null);
  $locations = signal<Location[]>([]);
  filteredLocations = signal<Location[]>([]);


  // Opciones del mapa
  options: google.maps.MapOptions = {
    mapId: 'YOUR_MAP_ID', // Reemplaza con tu Map ID
    disableDefaultUI: true, // Desactiva controles por defecto (opcional)
    fullscreenControl: true,
  };

  constructor(private locationsService: LocationsService) {

  }
  ngOnInit(): void {
    this.getAllLocations();
  }

  // Método para mover el mapa
  moveMap(event: google.maps.MapMouseEvent) {
    if (event.latLng) {
      console.log('Advanced marker added at:', event.latLng.toJSON());
      this.center.set(event.latLng.toJSON());
      // this.advancedMarkerPositions.push(event.latLng.toJSON());
    } else {
      console.error('Invalid event:', event);
    }
  }

  // advancedMarkerOptions: google.maps.marker.AdvancedMarkerElementOptions = { gmpDraggable: false };
  // advancedMarkerPositions: google.maps.LatLngLiteral[] = [];

  // marca de puntos en el mapa
  /*   addAdvancedMarker(event: google.maps.MapMouseEvent) {
      if (event.latLng) {
        console.log('Advanced marker added at:', event.latLng.toJSON());
        this.advancedMarkerPositions.push(event.latLng.toJSON());
      } else {
        console.error('Invalid event:', event);
      }
    } */


  // observable del service, le pasamos el signal center
  /*   locations$ = this.#locationsService.getAllLocations(this.center());
    $locations = toSignal(this.locations$, {
      initialValue: [],
    });


    markerClick(location: Location) {
      console.log('Marker clicked:', location);
      // Aquí puedes hacer algo con la ubicación del marcador

    } */


  //  traer todas las locaciones
  getAllLocations() {
    this.locationsService.getAllLocations(this.center()).subscribe({
      next: (fetchedLocations) => {
        console.log('locations:', fetchedLocations);
        this.$locations.set(fetchedLocations); // Ahora funciona correctamente
        this.filteredLocations.set(fetchedLocations); // Inicializa locaciones filtradas
      },
      error: (error) => {
        console.error('Error fetching locations:', error);
      }
    });
  }





  move(event: google.maps.MapMouseEvent) {
    if (event.latLng) {
      this.display.set(event.latLng.toJSON());
    }
  }


  // Filtrar locaciones por texto
  filterLocations(event: Event) {
    console.log('filtrar locaciones: ', JSON.stringify(event));
    const input = event.target as HTMLInputElement; // Especifica que el target es un HTMLInputElement
    const query = input.value.toLowerCase(); // Ahora puedes acceder a "value" sin errores
    const filtered = this.$locations().filter(location =>
      location.address.toLowerCase().includes(query)
    );
    this.filteredLocations.set(filtered);
  }

  // Seleccionar locación y centrar el mapa
  selectLocation(location: Location) {
    this.center.set({
      lat: location.geo_point.coordinates[0],
      lng: location.geo_point.coordinates[1],
    });
    this.zoom.set(14); // Ajustar zoom para resaltar el punto seleccionado
  }

}
