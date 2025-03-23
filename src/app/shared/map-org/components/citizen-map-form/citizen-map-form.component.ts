import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output, signal, ViewChild } from '@angular/core';
import { Form, FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LocationsService } from '../../services/locations.service';
import { CitizenMap } from '../../interfaces/citizen-map.interface';
import MapOrgComponent from "../map-org/map-org.component";
import { GoogleMap, MapMarker } from '@angular/google-maps';

@Component({
  selector: 'citizen-map-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, MapOrgComponent, GoogleMap, MapMarker],
  templateUrl: './citizen-map-form.component.html',
  styleUrl: './citizen-map-form.component.css'
})

// declare var google: any;

export default class CitizenMapFormComponent implements OnInit {

  // @Output() coordinatesUpdated = new EventEmitter<{ lat: number; lng: number }>();
  // @Output() addressUpdated = new EventEmitter<string>();


  @Output() locationSelected = new EventEmitter<{ lat: number; lng: number; address: string }>();
  @ViewChild('searchBox', { static: true }) searchBox!: any;

  center: google.maps.LatLngLiteral = { lat: -33.4725, lng: -70.6043 };
  zoom = 14;
  selectedLocation: google.maps.LatLngLiteral | null = null;
  selectedAddress: string = '';


  // formulario mapa ciudadano
  citizenMapForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.minLength(5)]),
    location: new FormGroup({
      address: new FormControl('', [Validators.required, Validators.minLength(5)]),
      description: new FormControl('', [Validators.required]),
      category: new FormControl('', [Validators.required]),
      url_icon: new FormControl('', [Validators.required]),
      is_public: new FormControl(false),
      city_code: new FormControl('', [Validators.required]),
      geo_point: new FormGroup({
        type: new FormControl('Point'),
        coordinates: new FormArray([
          new FormControl(''), // Latitud
          new FormControl('')  // Longitud
        ])
      }),
    })
  });

  constructor(
    private locationService: LocationsService
  ) {

  }

  ngOnInit(): void {
    this.initializeAutocomplete();
    // this.onAddressInput = this.onAddressInput.bind(this);
  }


  initializeAutocomplete() {
    // obtengo el id de la direccion
    const input = document.getElementById('address') as HTMLInputElement;

    // aplicamos funcionalidad autocompletado de google maps
    const autocomplete = new google.maps.places.Autocomplete(input);

    // Escucha el evento de selección de la sugerencia
    autocomplete.addListener('place_changed', () => {
      // Obtener el lugar seleccionado por el usuario y su coordenadas
      const place = autocomplete.getPlace();
      // si el lugar tiene coordenadas obtenemos la latitud y logintud
      if (place.geometry && place.geometry.location) {
        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();
        console.log('lat 1', lat)
        console.log('lng 1', lng)

        // obtenemos el formArray de coordinates y actualizamos su valor
        const coordinatesArray = this.citizenMapForm.get('location.geo_point.coordinates') as FormArray;
        // actualizo coordenadas
        coordinatesArray.setControl(0, new FormControl(lat));
        coordinatesArray.setControl(1, new FormControl(lng));

        // centramos el mapa en la ubicacion seleccionada
        this.center = { lat, lng };  // Aquí actualizamos el mapa
        this.selectedLocation = { lat, lng }; // También actualizamos el marcador
      }
    });
  }


  // create citizen map
  createCitizenMap() {
    console.log('citizenMapData:', this.citizenMapForm.value);
    if (this.citizenMapForm.valid) {
      const formData = this.citizenMapForm.value;

      // Aquí creamos el objeto CitizenMap a partir del formulario
      const citizenMap: CitizenMap = {
        name: formData.name,
        location: formData.location
      };

      this.locationService.createCitizenMap(citizenMap).subscribe(res => {
        console.log('Citizen map created successfully', res);
      })
    } else {
      console.log('Formulario inválido');
    }
  }

  onMapClick(event: google.maps.MapMouseEvent) {
    if (event.latLng) {
      this.selectedLocation = { lat: event.latLng.lat(), lng: event.latLng.lng() };
      this.center = this.selectedLocation;

      this.reverseGeocode(this.selectedLocation);
    }
  }

  reverseGeocode(latlng: google.maps.LatLngLiteral) {
    const geocoder = new google.maps.Geocoder();

    geocoder.geocode({ location: latlng }, (results, status) => {
      if (status === 'OK' && results && results.length > 0) {
        this.selectedAddress = results[0].formatted_address;
        this.searchBox.nativeElement.value = this.selectedAddress;
      } else {
        console.warn("⚠️ No se pudo obtener la dirección para las coordenadas.");
      }
    });
  }

}




