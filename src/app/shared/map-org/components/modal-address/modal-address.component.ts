import { CommonModule } from '@angular/common';
import { Component, ElementRef, Inject, NgModuleRef, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup, FormsModule, NgModel } from '@angular/forms';
import { GoogleMap, MapMarker } from '@angular/google-maps';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule  } from '@angular/material/dialog';
import MapOrgComponent from '../map-org/map-org.component';

@Component({
  selector: 'shared-modal-address',
  standalone: true,
  imports: [GoogleMap, MapMarker, CommonModule, FormsModule, MatDialogModule, MapOrgComponent],
  templateUrl: './modal-address.component.html',
  styleUrl: './modal-address.component.css'
})
export class ModalAddressComponent {

  // addressInput solo esta disponible despues de que se renderiza. static = false
  @ViewChild('addressInput', { static: false }) addressInput!: ElementRef;
  @ViewChild('mapComponent') mapComponent!: MapOrgComponent;


  center = { lat: -30.0000, lng: -10.000 }; // Coordenadas iniciales
  // coordenadas de direccion seleccionada
  selectedLocation: { lng: number, lat: number } | null = null;
  selectedAddress: string = ''; // Dirección ingresada manualmente
  geocoder = new google.maps.Geocoder(); // Instancia de Geocoder

  // form para address ingresada
  citizenMapForm: FormGroup = new FormGroup({
    name: new FormControl(''),
    location: new FormGroup({
      gm_formatted_address: new FormControl(''),
      geo_point: new FormGroup({
        coordinates: new FormArray([
          new FormControl(''), // Latitud
          new FormControl('')  // Longitud
        ])
      })
    })
  });

  constructor(
    public dialogRef: MatDialogRef<ModalAddressComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (data?.location) {
      this.center = data.location;
    }
  }

  // verificvamos si address input existe antes de inicializarlo
  ngAfterViewInit() {
    if (this.addressInput) {
      this.initializeAutocomplete();
    }
  }



  initializeAutocomplete() {
    console.log("Autocomplete 2");

    if (!this.addressInput) return;

    const autocomplete = new google.maps.places.Autocomplete(this.addressInput.nativeElement);

    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      if (place.geometry && place.geometry.location) {
        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();

        this.selectedLocation = { lng, lat };
        this.selectedAddress = place.formatted_address || '';
        this.center = { lat, lng };
      }
    });
  }

  onMapClick(event: any) {
    const lat = event.detail.latLng.lat();
    const lng = event.detail.latLng.lng();
    this.selectedLocation = { lat, lng };

    this.geocoder.geocode({ location: { lng, lat } }, (results, status) => {
      if (status === 'OK' && results?.length) {
        this.selectedAddress = results[0].formatted_address;
      } else {
        this.selectedAddress = 'Dirección no encontrada';
      }
    });
  }

  // reverseGeocode(lat: number, lng: number) {
  //   this.geocoder.geocode({ location: { lat, lng } }, (results, status) => {
  //     if (status === 'OK' && results && results.length > 0) {  // Verifica que results no sea null
  //       this.selectedAddress = results[0].formatted_address;
  //     } else {
  //       console.error('No se pudo obtener la dirección:', status);
  //       this.selectedAddress = 'Dirección no encontrada';
  //     }
  //   });
  // }

  saveLocation() {
    console.log("Saving location");

    this.dialogRef.close({
      gm_formatted_address: this.selectedAddress,
      location: this.selectedLocation
    });

    console.log("address saved", this.selectedAddress);
    console.log("location saved", this.selectedLocation);
  }

  close(): void {
    this.dialogRef.close();
  }

  moveMap(event: google.maps.MapMouseEvent): void {
    console.log('Método para mover el map' + event)

    const latlng = event;

    if (latlng) {
      // const lat = latlng.lat();
      // const lng = latlng.lng();
      // console.log('lat: ', lat, ', lng: ', lng);

      if (this.mapComponent) {
        // llamamos a la funcion getAddressFromcoords
        // this.mapComponent.getAddressFromCoords(lat, lng);
      }

      // this.mapComponent.moveMap(event);
    } else {
      console.error('latlng is null');
    }
  }

  updatedAddress(address: string): void {
    console.log('Address updated: ', address);
    this.selectedAddress = address; // actualizamos la variable con la direccion recibida
  }

  onLocationSelected(location: { lng: number; lat: number }) {
    this.selectedLocation = location;
    this.geocoder.geocode({ location }, (results, status) => {
      if (status === 'OK' && results?.length) {
        this.selectedAddress = results[0].formatted_address;
      } else {
        this.selectedAddress = 'Dirección no encontrada';
      }
    });
  }


}
