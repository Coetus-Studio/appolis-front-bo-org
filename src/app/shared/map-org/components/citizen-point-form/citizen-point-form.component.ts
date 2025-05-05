import { CommonModule } from '@angular/common';
import { Component, EventEmitter, NgModule, OnInit, Output, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup, NgModel, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

import { CitizenMap } from '../../interfaces/citizen-map.interface';
import { LocationsService } from '../../services/locations.service';
import { ModalAddressComponent } from "../modal-address/modal-address.component";
import { AuthService } from '../../../../auth/auth.service';

@Component({
  selector: 'shared-citizen-map-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './citizen-point-form.component.html',
  styleUrl: './citizen-point-form.component.css'
})

// declare var google: any;

export default class CitizenPointsFormComponent implements OnInit {

  @Output() locationSelected = new EventEmitter<{ lng: number; lat: number; address: string }>();
  // @ViewChild('searchBox', { static: true }) searchBox!: any;

  // manejamos variable para saber estado de modal
  isAddressModalOpen = false;

  successMessage: string | null = null;
  errorMessage: string | null = null;

  orgId: any;

  // formulario mapa ciudadano
  citizenMapForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.minLength(5)]),
    icon_url: new FormControl('', [Validators.required]),
    responsible_organization: new FormControl(''),
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
    }),
  });

  constructor(
    private locationService: LocationsService,
    private dialog: MatDialog,
    private authService: AuthService,

  ) {

    this.authService.organizationId$.subscribe((orgId) => {
      this.orgId = orgId;
      console.log('org id => ', this.orgId)

      // asigno this.orgId a responsible_organization
      this.citizenMapForm.get('responsible_organization')?.setValue(this.orgId);

    })

    this.authService.getOrgId();
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
        _id: formData._id,
        name: formData.name,
        icon_url: formData.icon_url,
        location: formData.location,
        responsible_organization: this.orgId,
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
      data: { location: { lat: -30.0000, lng: -10.000 } } // aqui setear datos de la posicion de la consulta
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Guarda los datos en el formulario
        this.citizenMapForm.patchValue({
          location: {
            gm_formatted_address: result.gm_formatted_address,
            geo_point: {
              coordinates: [result.location.lng, result.location.lat]
            }
          }
        });
      }
    });
  }

  closeAddressModal() {
    this.isAddressModalOpen = false;
  }

}




