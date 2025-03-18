import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LocationsService } from '../../services/locations.service';

@Component({
  selector: 'citizen-map-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './citizen-map-form.component.html',
  styleUrl: './citizen-map-form.component.css'
})

// declare var google: any;

export default class CitizenMapFormComponent implements OnInit {


  // formulario mapa ciudadano
  citizenMapForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.minLength(5)]),
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
  })

  // guardo valores del form
  citizenMapData = signal<any>(null);

  // Sugerencias de dirección
  addressSuggestions: any[] = [];

  constructor(
    private locationService: LocationsService
  ) {

  }

  ngOnInit(): void {
    this.initializeAutocomplete();
  }

  // Método para obtener las coordenadas desde el formulario
  get coordinates(): FormArray {
    return (this.citizenMapForm.get('geo_point.coordinates') as FormArray);
  }



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


        // Actualizar el formulario con la latitud y longitud
        this.citizenMapForm.get('latitude')?.setValue(lat);
        this.citizenMapForm.get('longitude')?.setValue(lng);
      }
    });
  }

  // TODO: ver que hace este metodo
  // Detectar cambios en el input
  onAddressInput() {
    const addressValue = this.citizenMapForm.get('address')?.value;

    if (addressValue && addressValue.length > 2) {
      const service = new google.maps.places.AutocompleteService();
      service.getPlacePredictions({ input: addressValue }, (predictions: google.maps.places.AutocompletePrediction[] | null, status: google.maps.places.PlacesServiceStatus) => {
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

  // seleccion direccion
  selectAddress(suggestion: any) {
    this.citizenMapForm.get('address')?.setValue(suggestion.description);

    const place = suggestion.place_id;
    const geocoder = new google.maps.Geocoder();

    geocoder.geocode({ placeId: place }, (results: google.maps.GeocoderResult[] | null, status: google.maps.GeocoderStatus) => {
      if (status === google.maps.GeocoderStatus.OK && results && results.length > 0) {
        const location = results[0].geometry.location;
        this.citizenMapForm.get('latitude')?.setValue(location.lat());
        this.citizenMapForm.get('longitude')?.setValue(location.lng());
      }
    });

    this.addressSuggestions = [];  // Limpiar las sugerencias
  }


  createCitizenMap() {

  }



}
