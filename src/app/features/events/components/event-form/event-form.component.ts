import { CommonModule, JsonPipe } from '@angular/common';
import { Component, Input, OnChanges, OnInit, signal, SimpleChanges } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EventService } from '../../services/event.service';
import { RouterLink, RouterOutlet } from '@angular/router';
// import LocationFormComponent from '../../../../shared/map-org/components/location-form/location-form.component';
import { LocationsService } from '../../../../shared/map-org/services/locations.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalAddressComponent } from '../../../../shared/map-org/components/modal-address/modal-address.component';
import { EventForm } from '../../interfaces/events.interface';

@Component({
  selector: 'event-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './event-form.component.html',
  styleUrl: './event-form.component.css'
})
export class EventFormComponent implements OnChanges {

  // aqui almacenmos el evento enviado desde el componente padre edit event
  @Input() eventData!: EventForm;

  isUpdate: boolean = false;
  isEditing: boolean = false;
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

  isAddressModalOpen = false;


  constructor(
    private eventService: EventService,
    private dialog: MatDialog
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    // throw new Error('Method not implemented.');
    if (changes['eventData'] && this.eventData) {
      this.eventForm.patchValue(this.eventData); // prellenamos el formulario

    }
  }

  ngOnInit() { }

  closeLocationModal() {
    this.isAddressModalOpen = false;
    // this.eventForm.get('location')?.reset(); // Limpia los datos del formulario de ubicación al cerrar el modal
  }

  createEvent() {
    console.log('eventData: ', this.eventForm.value);
    if (this.eventForm.valid) {
      const formData = this.eventForm.value;

      // aqui creamos el objeto eventMap a partir del formulario
      const event: EventForm = {
        _id: formData.id,
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
      })
    }
    else {
      console.log('El formulario no es válido');
    }
  }

  openAddressModal() {
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
        // Actualizar los valores en el formulario
        this.eventForm.get('location.gm_formatted_address')?.setValue(result.gm_formatted_address);
        this.eventForm.get('location.geo_point.coordinates')?.setValue([
          result.location.lat,
          result.location.lng
        ]);
        // Actualizar los valores en el componente
        this.selectedAddress = result.gm_formatted_address;
      }
    });
  }

  updateEvent(id: string): void {
    console.log('eventData: ', this.eventForm.value);
    console.log('id' + id)
    this.isUpdate = true;

    if (this.eventForm.valid) {

      const formData = this.eventForm.value;

      this.eventService.updateEvent(id, formData).subscribe(res => {
        console.log('Event updated successfully', res);
        this.isUpdate = false;
      });
    }
  }
}
