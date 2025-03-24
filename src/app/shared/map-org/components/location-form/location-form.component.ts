import { Component, EventEmitter, OnInit, Output, signal, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, FormArray } from '@angular/forms';
import { LocationsService } from '../../services/locations.service';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import CitizenMapFormComponent from '../citizen-map-form/citizen-map-form.component';
import { MatDialog } from '@angular/material/dialog';
import { ModalAddressComponent } from '../modal-address/modal-address.component';

declare var google: any;



@Component({
  selector: 'location-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
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

  selectedLocation: google.maps.LatLngLiteral | null = null;
  center: google.maps.LatLngLiteral = { lat: -33.4725, lng: -70.6043 };

  addressSuggestions: any[] = []; // Sugerencias de dirección

  // señal donde guardo la info de location enviada desde event
  locationData = signal<any>(null);

  selectedAddress: string = ''; // Dirección ingresada manualmente

  constructor(
    private locationService: LocationsService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    // this.initializeAutocomplete();
  }

  // Método para obtener las coordenadas desde el formulario
  get coordinates(): FormArray {
    return (this.locationForm.get('geo_point.coordinates') as FormArray);
  }

  // Inicializar Google Places Autocomplete
  // initializeAutocomplete() {
  //   const input = document.getElementById('address') as HTMLInputElement;
  //   const autocomplete = new google.maps.places.Autocomplete(input);

  //   // Escuchar el evento de selección de la sugerencia
  //   autocomplete.addListener('place_changed', () => {
  //     const place = autocomplete.getPlace();
  //     if (place.geometry && place.geometry.location) {
  //       const lat = place.geometry.location.lat();
  //       const lng = place.geometry.location.lng();
  //       console.log('lat', lat)
  //       console.log('lng', lng)


  //       // coordenadas reales de la direccion ingresada
  //       // Actualizar el formulario con la latitud y longitud
  //       this.locationForm.get('latitude')?.setValue(lat);
  //       this.locationForm.get('longitude')?.setValue(lng);
  //     }
  //   });
  // }


  // TODO: ver que hace este metodo
  // Detectar cambios en el input
  onAddressInput(query: string) {
    if (!query) return;
    const geocoder = new google.maps.Geocoder();

    console.log("onAddressInput");
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


  // nuevo metodo para interactuar con modal address
  openAddressModal() {
    console.log("Open address modal");

    const dialogRef = this.dialog.open(ModalAddressComponent, {
      width: '50',
      height: '60',
      data: {
        location: this.locationForm.get('location.geo_point.coordinates')?.value
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log("Resultado del modal:", result);

        // Actualizar los valores en el formulario
        this.locationForm.get('location.address')?.setValue(result.address);
        this.locationForm.get('location.geo_point.coordinates')?.setValue([
          result.location.lat,
          result.location.lng
        ]);

        // Actualizar los valores en el componente
        this.selectedAddress = result.address;
        this.selectedLocation = result.location;
        this.center = result.location;
      }
    });
  }


}
