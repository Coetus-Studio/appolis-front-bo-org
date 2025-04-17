
import { ChangeDetectionStrategy, Component, computed, EventEmitter, inject, Input, model, NgModule, OnChanges, OnInit, Output, signal, SimpleChanges, ViewChild, input } from '@angular/core';
import { FormControl, NgModel, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule, MatChipListbox, MatChipInputEvent  } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';

import { EventService } from '../../services/event.service';
import { ModalAddressComponent } from '../../../../shared/map-org/components/modal-address/modal-address.component';
import { EventForm, Status } from '../../interfaces/events.interface';
import { EventFormService } from '../../services/event-form.service';
import { AuthService } from '../../../../auth/auth.service';
import { LiveAnnouncer } from '@angular/cdk/a11y';


@Component({
  selector: 'event-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatInputModule, MatChipsModule, MatIconModule ],
  changeDetection: ChangeDetectionStrategy.OnPush,
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
  // createStatusId: Status = [];

  isAddressModalOpen = false;


  successMessage: string | null = null;
  successUpdateMessage: string | null = null;
  errorMessage: string | null = null;

  // datos sponsor
  sponsors: string[] = [];
  sponsorsControl = new FormControl<string[]>([]);
  // separatorKeysCodes: number[] = [ENTER, COMMA];

  readonly keywords = signal(['']);
  // readonly formControl = new FormControl(['angular']);
  // announcer = inject(LiveAnnouncer);



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
      this.eventForm.get('responsible_organization')?.setValue(orgId);
    });

    this.authService.getOrgUserId().subscribe(orgUserId => {
      this.orgUserId = orgUserId;
      this.eventForm.get('created_by')?.setValue(orgUserId);
    })

    // this.createStatusId = {
    //  _id: '632327686c6e9c9df048ee0f'
    // }
    // this.eventForm.get('status')?.setValue(this.createStatusId);
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
    console.log('sponsors', this.sponsors)

    console.log("event form: ", this.eventForm)

    this.eventForm.patchValue({
      status: {
        _id: '632327686c6e9c9df048ee0f',
        name: 'Creado'
      }
    });

    console.log("eventForm: ", this.eventForm)

    if (this.eventForm.valid) {
      const formData = this.eventForm.getRawValue();

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
          _id: formData.status._id
        },
        is_enabled: true,
        sponsors: this.sponsors
      }

      console.log("event: ", event)

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

/*   addSponsor(event: Event): void {
    const input = (event.target as HTMLInputElement);
    const value = input.value.trim();

    if (value && !this.sponsors.includes(value)) {
      this.sponsors.push(value);
      this.sponsorsControl.setValue(this.sponsors);
    }

    input.value = '';
    this.inputValue = '';
  } */


/*   removeSponsor(sponsor: string): void {
    const index = this.sponsors.indexOf(sponsor);
    if (index >= 0) {
      this.sponsors.splice(index, 1);
      this.sponsorsControl.setValue(this.sponsors);
    }
  } */

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    console.log("value: ", value)

    // Add our keyword
    if (value && !this.sponsors.includes(value)) {
      this.sponsors.push(value);
      this.eventForm.patchValue({ sponsor: this.sponsors })
      this.keywords.update(keywords => [...keywords, value]);
    }

    console.log("sponsors: ", this.sponsors)

    // limpio el input
    if (event.chipInput) {
      event.chipInput.clear()
    }

  }

  removeKeyword(sponsor: string) {
    console.log("sponsor: ", sponsor)
    const index = this.sponsors.indexOf(sponsor);
    console.log('index: ', index)
    if (index >= 0) {
      console.log("eliminando index")
      this.sponsors.splice(index, 1);
      console.log("eliminando 2")
      this.sponsorsControl.setValue(this.sponsors);
      console.log("eliminando 3")
      // this.eventForm.patchValue({ sponsor: this.sponsors });
    }
  }

}
