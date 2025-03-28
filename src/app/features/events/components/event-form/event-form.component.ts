import { CommonModule, JsonPipe } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EventService } from '../../services/event.service';
import { RouterLink, RouterOutlet } from '@angular/router';
import LocationFormComponent from '../../../../shared/map-org/components/location-form/location-form.component';
import { LocationsService } from '../../../../shared/map-org/services/locations.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalAddressComponent } from '../../../../shared/map-org/components/modal-address/modal-address.component';
import { EventForm } from '../../interfaces/events.interface';

@Component({
  selector: 'event-form',
  standalone: true,
  imports: [LocationFormComponent, CommonModule, ReactiveFormsModule, JsonPipe],
  templateUrl: './event-form.component.html',
  styleUrl: './event-form.component.css'
})
export class EventFormComponent implements OnInit {

  isUpdate: boolean = false;
  public isMapVisible: boolean = false; // Controla la visibilidad del mapa y formulario adicional

  selectedAddress: string = ''; // Dirección ingresada manualmente

  eventForm: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(5)]),
    description: new FormControl('', [Validators.required]),
    start_date: new FormControl(''),
    end_date: new FormControl(''),
    responsible_organization: new FormControl(''),
    created_by: new FormControl(''),
    location: new FormGroup({
      gm_formatted_address: new FormControl('', [Validators.required, Validators.minLength(5)]),
      description: new FormControl('Event Location Saved'),
      is_public: new FormControl(false),
      geo_point: new FormGroup({
        type: new FormControl('Point'),
        coordinates: new FormArray([
          new FormControl(''), // Latitud
          new FormControl('')  // Longitud
        ])
      })
    })
  });

  // Objeto para almacenar la ubicación seleccionada
  location: any;  // Aquí almacenas la ubicación seleccionada

  isAddressModalOpen = false;

  selectedLocation: google.maps.LatLngLiteral | null = null;
  center = signal<google.maps.LatLngLiteral>({ lat: -33.45694, lng: -70.64827 });
  // center: google.maps.LatLngLiteral = { lat: -33.4725, lng: -70.6043 };

  // modal location
  isModalEventLocationOpen = false;
  isLocationSaved = false; // Controla si la ubicación fue guardada o no
  eventLocationSaved = signal<any>(false); //
  // Signal que contendrá la información de la ubicación
  // locationData = signal<any>({});

  constructor(
    private eventService: EventService,
    private locationService: LocationsService,
    private dialog: MatDialog
  ) { }

  ngOnInit() { }

  // Abrir el modal de ubicación
  /*   openLocationModal() {
      this.isModalOpen = true; // Cambia el estado a abierto
    } */

  // Cerrar el modal
  closeLocationModal() {
    this.isModalEventLocationOpen = false; // Cambia el estado a cerrado
    // this.eventForm.get('location')?.reset(); // Limpia los datos del formulario de ubicación al cerrar el modal
  }

  // envia el formulario de evento y guarda la ubicación
  createEvent() {

    console.log('eventData: ', this.eventForm.value);
    if (this.eventForm.valid) {
      const formData = this.eventForm.value;

      // aqui creamos el objeto eventMap a partir del formulario
      const event: EventForm = {
        title: formData.title,
        description: formData.description,
        start_date: formData.start_date,
        end_date: formData.end_date,
        responsible_organization: formData.responsible_organization,
        created_by: formData.created_by,
        location: formData.location,
      }

      this.eventService.createEvent(event).subscribe(res => {
        console.log('Event created successfully', res);

        // this.isModalEventLocationOpen = false; // Cambia el estado a cerrado
        // this.eventLocationSaved(true); // Emite la señal con la información de la ubicación guardada
      })
    }

    else {
      console.log('El formulario no es válido');
    }
  }

  // Muestra el mapa y el formulario adicional
  showMap(): void {
    this.isMapVisible = true;
  }

  openAddressModal() {
    console.log("Open address modal in event");

    this.isAddressModalOpen = true;

    const dialogRef = this.dialog.open(ModalAddressComponent, {
      width: '50',
      height: '60',
      data: {
        location: this.eventForm.get('location.geo_point.coordinates')?.value
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log("Resultado del modal event 2:", result);

        // Actualizar los valores en el formulario
        this.eventForm.get('location.gm_formatted_address')?.setValue(result.gm_formatted_address);
        this.eventForm.get('location.geo_point.coordinates')?.setValue([
          result.location.lat,
          result.location.lng
        ]);

        // Actualizar los valores en el componente
        this.selectedAddress = result.gm_formatted_address;
        this.selectedLocation = result.location;
        this.center = result.location;
      }
    });
  }

}
