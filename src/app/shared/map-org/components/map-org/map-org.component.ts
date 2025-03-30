import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, signal, SimpleChanges, ViewChild } from '@angular/core';
import { GoogleMap } from '@angular/google-maps';
import { CommonModule } from '@angular/common';
import { GoogleMapsService } from '../../services/google-maps.service';

declare var google: any; // Asegúrate de que Google esté disponible

@Component({
  selector: 'map-org',
  standalone: true,
  imports: [CommonModule, GoogleMap],
  templateUrl: './map-org.component.html',
  styleUrl: './map-org.component.css'
})
export default class MapOrgComponent implements AfterViewInit {

  // Output para guardar la locacion seleccionada
  @Output() locationSelected = new EventEmitter<{ lat: number; lng: number }>();
  // Nuevo Output para actualizar la dirección
  @Output() addressUpdated = new EventEmitter<string>();
  // Recibe la dirección ingresada en el formulario
  // @Input() gm_formatted_address: string = '';

  // coordenadas iniciales de carga del mapa
  center = signal<google.maps.LatLngLiteral>({ lat: -33.45694, lng: -70.64827 });
  zoom = signal<number>(12);

  // @ViewChild('mapContainer', { static: false }) mapElement!: ElementRef;
  @ViewChild('mapComponent') mapComponent!: MapOrgComponent;

  map!: google.maps.Map;
  marker!: google.maps.marker.AdvancedMarkerElement;
  geocoder!: google.maps.Geocoder;
  mapContainer: any;

  options: google.maps.MapOptions = {
    disableDefaultUI: true, // Desactiva controles por defecto (opcional)
    fullscreenControl: true,
  };

  constructor(private googleMapsService: GoogleMapsService) {
    console.log('constructor map-org inicializado')
  }

  ngAfterViewInit() {
    this.initMap();
  }

  initMap() {
    // verifico si el elemento mapa esta presente
    if (!this.mapComponent) {
      console.error('Error: map element not found');
      return
    }

    const mapOptions: google.maps.MapOptions = {
      center: this.center(), // Coordenadas iniciales
      zoom: this.zoom()
    };

    this.map = new google.maps.Map(document.getElementById('map')!, mapOptions);

    // Marcador inicial
    this.marker = new google.maps.Marker({
      position: mapOptions.center,
      map: this.mapComponent
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

  centerMap(lat: number, lng: number) {
    // TODO ver si este initMap aplica aqui, no esta funcionando el ngAfterViewInit
    this.initMap();
    console.log('Centrando el mapa a:', lat, lng);

    const newCenter = new google.maps.LatLng(lat, lng); // creamos una instancia de LatLng
    this.map.setCenter(newCenter);
    this.map.setZoom(14); // cambiar a signal
    // this.marker.position?(newCenter) //ver error
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

  // ngOnChanges(changes: SimpleChanges) {
  //   if (changes['address'] && this.gm_formatted_address) {
  //     this.centerMap(this.gm_formatted_address);
  //   }
  // }





}
