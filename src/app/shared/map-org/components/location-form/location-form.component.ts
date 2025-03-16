import { Component, OnInit, signal } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, FormArray } from '@angular/forms';
import { LocationsService } from '../../services/locations.service';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'location-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterOutlet],
  templateUrl: './location-form.component.html',
  styleUrls: ['./location-form.component.css']
})
export class LocationFormComponent implements OnInit {

  // formulario location
  locationForm: FormGroup = new FormGroup({
    address: new FormControl('', [Validators.required, Validators.minLength(5)]),
    description: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required]),
    url_icon: new FormControl('', [Validators.required]),
    is_public: new FormControl(false),
    city_code: new FormControl(''),
    geo_point: new FormGroup({
      type: new FormControl('Point'),  // Se asume que siempre será un tipo 'Point'
      coordinates: new FormArray([new FormControl(''), new FormControl('')], [Validators.required]) // Usamos un FormArray para las coordenadas
    })
  });

  addressSuggestions: any[] = []; // Sugerencias de dirección
  // locationSaved = signal<any>(null); // Signal para emitir los datos
  // eventLocationSaved = signal<any>(false); //
  // isLocationSaved = false; // Controla si la ubicación fue guardada o no

  // señal donde guardo la info de location enviada desde event
  locationData = signal<any>(null);

  constructor(private locationService: LocationsService) { }

  ngOnInit(): void {

  }

  onAddressInput() {
    // const addressValue = this.locationForm.get('address')?.value;
    // if (addressValue && addressValue.length > 2) {
    //   this.locationService.getAddressSuggestions(addressValue).subscribe((suggestions) => {
    //     this.addressSuggestions = suggestions;
    //   });
    // } else {
    //   this.addressSuggestions = [];
    // }
  }

  // selectAddress(suggestion: any) {
  //   this.locationForm.get('address')?.setValue(suggestion.description);
  //   this.locationForm.get('geo_point_lat')?.setValue(suggestion.geometry.location.lat());
  //   this.locationForm.get('geo_point_lng')?.setValue(suggestion.geometry.location.lng());
  //   this.addressSuggestions = [];
  // }


  // Guardar datos en la señal
  saveLocation() {
    if (this.locationForm.valid) {
      console.log("locationForm", this.locationForm.value);
      this.locationData.set({
        ...this.locationForm.value,
        geo_point: {
          type: 'Point',
          coordinates: [
            this.locationForm.value.geo_point_lng,
            this.locationForm.value.geo_point_lat
          ]
        }
      });
      this.locationService.setLocationData(this.locationData());
      console.log('Datos de ubicación guardados en la señal:', this.locationData());
    } else {
      console.log('El formulario de ubicación no es válido.');
    }
  }


}
