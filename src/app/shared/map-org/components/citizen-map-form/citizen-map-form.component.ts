import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

import { CitizenMap } from '../../interfaces/citizen-map.interface';
import { LocationsService } from '../../services/locations.service';
import { ModalAddressComponent } from "../modal-address/modal-address.component";

@Component({
  selector: 'shared-citizen-map-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
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
    private locationService: LocationsService,
    private dialog: MatDialog
  ) {

  }

  ngOnInit(): void {
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


  // nuevo metodo para interactuar con modal address
  openAddressModal() {
    this.isAddressModalOpen = true;
    console.log("Open address modal");

    const dialogRef = this.dialog.open(ModalAddressComponent, {
      width: '600px',
      data: {
        location: this.citizenMapForm.get('location.geo_point.coordinates')?.value
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log("Resultado del modal:", result);

        // Actualizar los valores en el formulario
        this.citizenMapForm.get('location.address')?.setValue(result.address);
        this.citizenMapForm.get('location.geo_point.coordinates')?.setValue([
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

  closeAddressModal() {
    this.isAddressModalOpen = false;
  }

}




