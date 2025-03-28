import { CommonModule } from '@angular/common';
import { Component, EventEmitter, NgModule, OnInit, Output, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup, NgModel, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

import { CitizenMap } from '../../interfaces/citizen-map.interface';
import { LocationsService } from '../../services/locations.service';
import { ModalAddressComponent } from "../modal-address/modal-address.component";

@Component({
  selector: 'shared-citizen-map-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, ModalAddressComponent],
  templateUrl: './citizen-map-form.component.html',
  styleUrl: './citizen-map-form.component.css'
})

// declare var google: any;

export default class CitizenMapFormComponent implements OnInit {

  @Output() locationSelected = new EventEmitter<{ lat: number; lng: number; address: string }>();
  @ViewChild('searchBox', { static: true }) searchBox!: any;

  center: google.maps.LatLngLiteral = { lat: -33.4725, lng: -70.6043 };
  zoom = 14;
  selectedLocation: google.maps.LatLngLiteral | null = null;
  selectedAddress: string = ''; // Dirección ingresada manualmente

  // manejamos variable para saber estado de modal
  isAddressModalOpen = false;

  successMessage: string | null = null;
  errorMessage: string | null = null;

  // formulario mapa ciudadano
  citizenMapForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.minLength(5)]),
    location: new FormGroup({
      description: new FormControl('', [Validators.required]),
      gm_formatted_address: new FormControl('', [Validators.required, Validators.minLength(5)]),
      is_public: new FormControl(false),
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
    private locationService: LocationsService,
    private dialog: MatDialog
  ) {

  }

  ngOnInit(): void {
  }

   // Métodos para mostrar errores de validación en los campos
   get name() { return this.citizenMapForm.get('name'); }
   get description() { return this.citizenMapForm.get('description'); }
   get address() { return this.citizenMapForm.get('location.gm_formatted_address'); }



  // create citizen map
  createCitizenMap() {
    console.log('citizenMapData:', this.citizenMapForm.value);
    if (this.citizenMapForm.valid) {
      const formData = this.citizenMapForm.value;

      // Aquí creamos el objeto CitizenMap a partir del formulario
      const citizenMap: CitizenMap = {
        name: formData.name,
        location: formData.location,
      };

      this.locationService.createCitizenMap(citizenMap).subscribe(res => {
        console.log('Citizen map created successfully', res);


        setTimeout(() => {
          this.successMessage = 'Mapa ciudadano creado con éxito.';
          this.errorMessage = null;
          this.citizenMapForm.reset(); // Limpia el formulario
        }, 1000);
      })
    } else {
      console.log('Formulario inválido');
      this.errorMessage = 'Por favor, completa todos los campos obligatorios.';
      this.successMessage = null;
    }
  }


  // nuevo metodo para interactuar con modal address
  openAddressModal() {
    const dialogRef = this.dialog.open(ModalAddressComponent, {
      width: '500px',
      disableClose: false,
      data: { location: { lat: -30.0000, lng: -10.000 } } // Puedes pasar datos opcionales
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Guarda los datos en el formulario
        this.citizenMapForm.patchValue({
          location: {
            gm_formatted_address: result.gm_formatted_address,
            geo_point: {
              coordinates: [result.location.lat, result.location.lng]
            }
          }
        });
      }
    });
  }

  closeAddressModal() {
    this.isAddressModalOpen = false;
  }

  setAddress(selectedAddress: string) {
    this.citizenMapForm.get('location.gm_formatted_address')?.setValue(selectedAddress);
  }
}




