import { CommonModule, JsonPipe } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, signal, SimpleChanges } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EventService } from '../../services/event.service';
import { RouterLink, RouterOutlet } from '@angular/router';
// import LocationFormComponent from '../../../../shared/map-org/components/location-form/location-form.component';
import { LocationsService } from '../../../../shared/map-org/services/locations.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalAddressComponent } from '../../../../shared/map-org/components/modal-address/modal-address.component';
import { EventForm } from '../../interfaces/events.interface';
import { EventFormService } from '../../services/event-form.service';

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

  // defino evento para cuando se presione boton enviar en eventForm
  @Output() submitEvent = new EventEmitter<void>();

  isUpdate: boolean = false;
  // isCreate: boolean = false;

  public isMapVisible: boolean = false; // Controla la visibilidad del mapa y formulario adicional

  selectedAddress: string = ''; // Dirección ingresada manualmente

  // eventForm = this.eventFormService.getForm();
  eventForm: any;

  isAddressModalOpen = false;

  successMessage: string | null = null;
  successUpdateMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(
    private eventService: EventService,
    private eventFormService: EventFormService,
    private dialog: MatDialog
  ) {
    console.log('EventFormComponent')
    this.eventForm = this.eventFormService.getForm();

    this.eventService.isUpdating$.subscribe(event => {
      this.isUpdate = event;
    })
    console.log('isUpdate: ' + this.isUpdate)
    this.eventForm = this.eventFormService.getForm();
  }


  ngOnChanges(changes: SimpleChanges): void {
    // throw new Error('Method not implemented.');
    if (changes['eventData'] && this.eventData) {
      this.eventForm.patchValue(this.eventData); // prellenamos el formulario

    }
  }

  closeLocationModal() {
    this.isAddressModalOpen = false;
    // this.eventForm.get('location')?.reset(); // Limpia los datos del formulario de ubicación al cerrar el modal
  }

  createEvent() {
    console.log('eventData 1: ', this.eventForm.value);
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
      setTimeout(() => {
        this.successMessage = 'Evento creado con éxito.';
        this.errorMessage = null;
        this.eventForm.reset(); // Limpia el formulario
      }, 1000);
      // this.isCreate = false;
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
          result.location.lng,
          result.location.lat
        ]);
        // Actualizar los valores en el componente
        this.selectedAddress = result.gm_formatted_address;
      }
    });
  }

  updateEvent(id: string): void {
    // this.isUpdate = true;
    console.log('eventData 2: ', this.eventForm.value);
    console.log('id' + id)

    if (this.eventForm.valid) {

      const formData = this.eventForm.value;

      this.eventService.updateEvent(id, formData).subscribe(res => {
        console.log('Event updated successfully', res);
        // this.isUpdate = false;
      });
      setTimeout(() => {
        this.successUpdateMessage = 'Evento actualizado con éxito.';
        this.errorMessage = null;
        this.eventForm.reset(); // Limpia el formulario
      }, 1000);
    } else {
      console.log('El formulario no es válido');
      this.errorMessage = 'Por favor, completa todos los campos obligatorios.';
    }
  }

    // aqui controlo si es create o update
    onSubmit() {
      console.log('eventData 3: ', this.eventForm.value);

      if (this.isUpdate) {
        this.updateEvent(this.eventData._id);
      } else {
        this.createEvent();
      }
    }
}
