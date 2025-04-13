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
import { AuthService } from '../../../../auth/auth.service';

@Component({
  selector: 'event-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './event-form.component.html',
  styleUrl: './event-form.component.css'
})
export class EventFormComponent implements OnChanges, OnInit {

  // aqui almacenmos el evento enviado desde el componente padre edit event
  @Input() eventData!: EventForm;

  // defino evento para cuando se presione boton enviar en eventForm
  @Output() submitEvent = new EventEmitter<void>();

  isUpdate: boolean = false;

  // Controla la visibilidad del mapa y formulario adicional
  public isMapVisible: boolean = false;

  // Dirección ingresada manualmente
  selectedAddress: string = '';

  // guardo valores obtenidos desde getAllEventStatus
  statusOptions: { label: string, value: string }[] = []

  eventForm: any;
  orgId: any;
  orgUserId: any;

  isAddressModalOpen = false;


  successMessage: string | null = null;
  successUpdateMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(
    private eventService: EventService,
    private eventFormService: EventFormService,
    private authService: AuthService,
    private dialog: MatDialog
  ) {
    this.eventForm = this.eventFormService.getForm();

    this.eventService.isUpdating$.subscribe(event => {
      this.isUpdate = event;
    })

    this.authService.getOrgId().subscribe(orgId => {
      this.orgId = orgId;
    });

    this.authService.getOrgUserId().subscribe(orgUserId => {
      this.orgUserId = orgUserId;
    })
  }
  ngOnInit(): void {
    if (this.isUpdate) {
      this.loadStatusOptions();
    }
  }


  ngOnChanges(changes: SimpleChanges): void {
    // throw new Error('Method not implemented.');
    if (changes['eventData'] && this.eventData) {
      this.eventForm.patchValue({
        ...this.eventData,
        status: this.eventData.status?._id
      }); // prellenamos el formulario
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

      const event: EventForm = {
        _id: formData.id,
        title: formData.title,
        description: formData.description,
        start_date: formData.start_date,
        end_date: formData.end_date,
        responsible_organization: this.orgId,
        created_by: this.orgUserId,
        location: formData.location,
        status: {
          _id: '632327686c6e9c9df048ee0f',
        },
        is_enabled: true
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
    if (this.eventForm.valid) {
      const formData = this.eventForm.value;

      console.log('statusOptions => ', this.statusOptions)

      const selectedStatus = this.statusOptions.find(
        option => option.value === formData.status
      );

      const statusId = selectedStatus?.value

      console.log('selectedStatus: ', selectedStatus?.value)
      console.log('statusId: ', statusId)

      const event: EventForm = {
        _id: formData.id,
        title: formData.title,
        description: formData.description,
        start_date: formData.start_date,
        end_date: formData.end_date,
        responsible_organization: this.orgId,
        created_by: this.orgUserId,
        location: formData.location,
        status: {
          _id: statusId || ''
        },
        is_enabled: true
      };

      console.log('event', event)

      // Si el estado es cerrado (buscando por label, no por _id)
      const statusLabel = selectedStatus?.label;
      console.log("statusLabel", statusLabel)

      if (statusLabel === 'Cerrado') {
        event.is_enabled = false;
      }

      this.eventService.updateEvent(id, event).subscribe({
        next: (res) => {
          console.log('Event updated successfully', res);
          this.successUpdateMessage = 'Evento actualizado con éxito.';
          this.errorMessage = null;
        },
        error: (err) => {
          console.error('Error al actualizar evento', err);
          this.errorMessage = 'Error al actualizar evento.';
        }
      });
    } else {
      console.log('El formulario no es válido');
      this.errorMessage = 'Por favor, completa todos los campos obligatorios.';
    }
  }


  // aqui controlo si es create o update
  onSubmit() {
    // con esto me traigo los valores actuales del form que esta en el service
    // console.log('eventData 3: ', this.eventForm.getRawValue());

    if (this.isUpdate) {
      this.updateEvent(this.eventData._id);
    } else {
      this.createEvent();
    }
  }


  loadStatusOptions() {
    this.eventService.getEventStatus().subscribe({
      next: (statuses) => {
        this.statusOptions = statuses
          .filter(status => !!status.name)
          .map(status => ({
            label: status.name!,
            value: status._id
          }));
      },
      error: (err) => {
        console.error('Error al cargar los estados del evento', err);
      }
    });
  }

}
