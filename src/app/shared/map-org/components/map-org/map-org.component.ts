import { Component, EventEmitter, Input, OnInit, Output, signal, SimpleChanges } from '@angular/core';
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

  // Output para guardar la locacion seleccionada
  @Output() locationSelected = new EventEmitter<{ lat: number; lng: number }>();

  // Nuevo Output para actualizar la dirección
  @Output() addressUpdated = new EventEmitter<string>();

  // Recibe la dirección ingresada en el formulario
  @Input() address: string = '';

  // coordenadas iniciales de carga del mapa
  center = signal<google.maps.LatLngLiteral>({ lat: -33.45694, lng: -70.64827 });
  zoom = signal<number>(10);
  // display = signal<google.maps.LatLngLiteral | null>(null);

  // Opciones del mapa
  options: google.maps.MapOptions = {
    mapId: 'AIzaSyDggZWuCu532Dqp1KWDGy28_3GlRSiRfek', // Reemplaza con tu Map ID
    disableDefaultUI: true, // Desactiva controles por defecto (opcional)
    fullscreenControl: true,
  };

  map!: google.maps.Map;
  marker!: google.maps.marker.AdvancedMarkerElement;
  geocoder!: google.maps.Geocoder;
  mapContainer: any;

  ngOnInit() {
    this.initMap();
  }

  initMap() {
    this.geocoder = new google.maps.Geocoder();

    const initialPosition = { lat: -34.397, lng: 150.644 }; // Coordenadas iniciales (puedes cambiarlas)

    this.map = new google.maps.Map(this.mapContainer.nativeElement, {
      center: initialPosition,
      zoom: 14
    });

    this.marker = new google.maps.marker.AdvancedMarkerElement({
      position: initialPosition,
      map: this.map
    });
  }

  // metodo sugerencia direcciones
  initAutocomplete() {
    console.log('initAutocomplete')
    const input = document.getElementById('autocomplete') as HTMLInputElement;
    const autocomplete = new google.maps.places.Autocomplete(input);

    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      if (place.geometry) {
        console.log('Lugar seleccionado:', place);
        const coords = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        };
        this.center.set(coords);  // Mueve el mapa al nuevo punto
        this.locationSelected.emit(coords); // Envía la ubicación al componente padre
      }
    });
  }

  updateMapPosition(address: string) {
    this.geocoder.geocode({ address: address }, (results: any, status: any) => {
      if (status === 'OK' && results[0]) {
        const location = results[0].geometry.location;
        this.map.setCenter(location);
        this.marker.position = location; // Nueva forma de asignar la posición
      } else {
        console.error('Geocoding failed:', status);
      }
    });
  }

  // Método para mover el mapa
  moveMap(event: google.maps.MapMouseEvent) {
    console.log('Método para mover el map')
    if (event.latLng) {
      const newCoords = event.latLng.toJSON();
      this.center.set(newCoords);
      this.locationSelected.emit(newCoords);
      this.getAddressFromCoords(newCoords.lat, newCoords.lng);
    }
  }

  // Convertir coordenadas a dirección usando Geocoder
  getAddressFromCoords(lat: number, lng: number) {
    const geocoder = new google.maps.Geocoder();
    const latlng = { lat, lng };

    geocoder.geocode({ location: latlng }, (results: { formatted_address: any; }[], status: string) => {
      if (status === 'OK' && results[0]) {
        const formattedAddress = results[0].formatted_address;
        this.addressUpdated.emit(formattedAddress);
      }
    });
  }

  // Buscar coordenadas a partir de una dirección
  searchAddress(address: string) {
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ address }, (results: { geometry: { location: any; }; }[], status: string) => {
      if (status === 'OK' && results[0].geometry) {
        const location = results[0].geometry.location;
        this.center.set({ lat: location.lat(), lng: location.lng() });
        this.locationSelected.emit({ lat: location.lat(), lng: location.lng() });
      }
    });
  }

  // Método que emite el evento
  updateAddress(address: string) {
    this.addressUpdated.emit(address);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['address'] && this.address) {
      this.updateMapPosition(this.address);
    }
  }

  // geocodeAddress(address: string) {
  //   // Usando un servicio de geocodificación (Ej: Google Maps API)
  //   this.geocoder.geocode({ address: address }, (results, status) => {
  //     if (status === 'OK' && results[0]) {
  //       const location = results[0].geometry.location;
  //       this.map.setCenter(location);
  //       this.marker.setPosition(location);
  //     }
  //   });
  // }

}
