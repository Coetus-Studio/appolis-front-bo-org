import { Component, EventEmitter, OnInit, Output, signal, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, FormArray } from '@angular/forms';
import { LocationsService } from '../../services/locations.service';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import CitizenMapFormComponent from '../citizen-map-form/citizen-map-form.component';

declare var google: any;



@Component({
  selector: 'location-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, CitizenMapFormComponent],
  templateUrl: './location-form.component.html',
  styleUrls: ['./location-form.component.css']
})
export default class LocationFormComponent implements OnInit {

  // formulario location
  locationForm: FormGroup = new FormGroup({
    address: new FormControl('', [Validators.required, Validators.minLength(5)]),
    description: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required]),
    url_icon: new FormControl('', [Validators.required]),
    is_public: new FormControl(false),
    city_code: new FormControl('', [Validators.required]),
    geo_point: new FormGroup({
      type: new FormControl('Point'),
      coordinates: new FormArray([
        new FormControl('-30.0000'), // Latitud
        new FormControl('-10.000')  // Longitud
      ])

    }),
  });

  // evento para emitir la dirección
  @Output() addressUpdated = new EventEmitter<string>();

  @ViewChild('searchBox', { static: true }) searchBox!: any;

  addressSuggestions: any[] = []; // Sugerencias de dirección
  // locationSaved = signal<any>(null); // Signal para emitir los datos
  // eventLocationSaved = signal<any>(false); //
  // isLocationSaved = false; // Controla si la ubicación fue guardada o no

  // señal donde guardo la info de location enviada desde event
  locationData = signal<any>(null);

  // Declaramos google para usar la API de Google en el archivo

  constructor(private locationService: LocationsService) { }

  ngOnInit(): void {
    this.initializeAutocomplete();
  }

  // Método para obtener las coordenadas desde el formulario
  get coordinates(): FormArray {
    return (this.locationForm.get('geo_point.coordinates') as FormArray);
  }



  // Inicializar Google Places Autocomplete
  // // Inicializar Google Places Autocomplete
  initializeAutocomplete() {
    const input = document.getElementById('address') as HTMLInputElement;
    const autocomplete = new google.maps.places.Autocomplete(input);

    // Escuchar el evento de selección de la sugerencia
    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      if (place.geometry && place.geometry.location) {
        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();
        console.log('lat', lat)
        console.log('lng', lng)


        // coordenadas reales de la direccion ingresada
        // Actualizar el formulario con la latitud y longitud
        this.locationForm.get('latitude')?.setValue(lat);
        this.locationForm.get('longitude')?.setValue(lng);
      }
    });
  }


  // TODO: ver que hace este metodo
  // Detectar cambios en el input
  onAddressInput(query: string) {


    if (!query) return;

    console.log('query' + query);










    const addressValue = this.locationForm.get('address')?.value;

    if (addressValue && addressValue.length > 2) {
      const service = new google.maps.places.AutocompleteService();
      service.getPlacePredictions({ input: addressValue }, (predictions: never[], status: any) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          this.addressSuggestions = predictions || [];
        } else {
          this.addressSuggestions = [];
        }
      });
    } else {
      this.addressSuggestions = [];
    }
  }

  // Selección de dirección
  selectAddress(suggestion: any) {
    this.locationForm.get('address')?.setValue(suggestion.description);

    const place = suggestion.place_id;
    const geocoder = new google.maps.Geocoder();

    geocoder.geocode({ placeId: place }, (results: { geometry: { location: any; }; }[], status: string) => {
      if (status === 'OK' && results && results[0]) {
        const location = results[0].geometry.location;
        this.locationForm.get('latitude')?.setValue(location.lat());
        this.locationForm.get('longitude')?.setValue(location.lng());
      }
    });

    this.addressSuggestions = [];  // Limpiar las sugerencias
  }


  updateMapCenter(lat: number, lng: number) {
    // Aquí iría la lógica para mover el mapa a las nuevas coordenadas
    console.log('Centrándose en:', lat, lng);
  }


  // Guardar datos en la señal
  saveLocation() {

    console.log("locationForm", this.locationForm.value);

    // Obtener las coordenadas directamente desde los controles de latitud y longitud
    const latitude = this.locationForm.get('latitude')?.value;
    const longitude = this.locationForm.get('longitude')?.value;

    console.log('latitude:', latitude, 'longitude:', longitude);

    if (this.locationForm.valid) {
      console.log("locationForm", this.locationForm.value);

      // Obtener las coordenadas directamente desde los controles de latitud y longitud
      const latitude = this.locationForm.get('latitude')?.value;
      const longitude = this.locationForm.get('longitude')?.value;

      console.log('latitude:', latitude, 'longitude:', longitude);

      this.locationData.set({
        ...this.locationForm.value,
        geo_point: {
          type: 'Point',
          coordinates: [latitude, longitude]
        }
      });

      this.locationService.setLocationData(this.locationData());
      console.log('Datos de ubicación guardados en la señal:', this.locationData());
    } else {
      console.log('El formulario de ubicación no es válido.');
    }
  }



    // // Convertir coordenadas a dirección usando Geocoder
    // getAddressFromCoords(lat: number, lng: number) {
    //   const geocoder = new google.maps.Geocoder();
    //   const latlng = { lat, lng };

    //   geocoder.geocode({ location: latlng }, (results: { formatted_address: any; }[], status: string) => {
    //     if (status === 'OK' && results[0]) {
    //       const formattedAddress = results[0].formatted_address;
    //       this.addressUpdated.emit(formattedAddress);
    //     }
    //   });
    // }

    // // Buscar coordenadas a partir de una dirección
    // searchAddress(address: string) {
    //   const geocoder = new google.maps.Geocoder();
    //   geocoder.geocode({ address }, (results: { geometry: { location: any; }; }[], status: string) => {
    //     if (status === 'OK' && results[0].geometry) {
    //       const location = results[0].geometry.location;
    //       this.center.set({ lat: location.lat(), lng: location.lng() });
    //       this.locationSelected.emit({ lat: location.lat(), lng: location.lng() });
    //     }
    //   });
    // }


}
