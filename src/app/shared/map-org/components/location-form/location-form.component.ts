import { Component, OnInit, signal } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
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

  locationForm: FormGroup = new FormGroup({
    address: new FormControl('', [Validators.required, Validators.minLength(5)]),
    description: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required]),
    url_icon: new FormControl('', [Validators.required]),
    is_public: new FormControl(false),
    city_code: new FormControl(''),
    geo_point_lat: new FormControl(''),
    geo_point_lng: new FormControl(''),
  });

  addressSuggestions: any[] = []; // Sugerencias de dirección
  locationSaved = signal<any>(null); // Signal para emitir los datos

  constructor(private locationService: LocationsService) { }

  ngOnInit(): void {
    const addressInput = document.getElementById('address') as HTMLInputElement;
    if (addressInput) {
      this.locationService.initAutocomplete(addressInput);
    }
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

  selectAddress(suggestion: any) {
    this.locationForm.get('address')?.setValue(suggestion.description);
    this.locationForm.get('geo_point_lat')?.setValue(suggestion.geometry.location.lat());
    this.locationForm.get('geo_point_lng')?.setValue(suggestion.geometry.location.lng());
    this.addressSuggestions = [];
  }

  createLocation() {
    if (this.locationForm.valid) {
      console.log('Form Submitted!', this.locationForm.value);
      // this.locationService.createLocation

      // Aquí puedes agregar la lógica para enviar los datos del formulario a tu servidor
    } else {
      console.log('Form not valid');
    }
  }
}
