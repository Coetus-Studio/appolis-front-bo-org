import { CommonModule, JsonPipe } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EventService } from '../../services/event.service';
import { RouterLink, RouterOutlet } from '@angular/router';
import { LocationFormComponent } from '../../../../shared/map-org/components/location-form/location-form.component';

@Component({
  selector: 'event-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, JsonPipe, RouterLink, RouterOutlet, LocationFormComponent],
  templateUrl: './event-form.component.html',
  styleUrl: './event-form.component.css'
})
export class EventFormComponent implements OnInit {

  isUpdate: boolean = false;
  public isMapVisible: boolean = false; // Controla la visibilidad del mapa y formulario adicional
  // eventForm: FormGroup = new FormGroup({});

  eventForm = signal<FormGroup>(
    new FormGroup({
      title: new FormControl('', [Validators.required, Validators.minLength(5)]),
      description: new FormControl('', [Validators.required]),
      start_date: new FormControl('', ),
      end_date: new FormControl(''),
      responsible_organization: new FormControl(''),
      messages: new FormControl('', []),
      event_type: new FormControl(''),
      assistents: new FormControl(''),
      created_by: new FormControl(''),
      location: new FormGroup({
        address: new FormControl(''),
        description: new FormControl(''),
        category: new FormControl('', ),
        is_public: new FormControl(''),
        city_code: new FormControl(''),
        geo_point: new FormGroup({
          type: new FormControl(''),
          coordinates: new FormControl('')
        })
      }),
      images: new FormControl('', []),
      status: new FormControl('active', []),
      created_at: new FormControl(new Date().toISOString(), [])
    })
  )




  // eventForm = new FormGroup({
  //   title: new FormControl('', [Validators.required, Validators.minLength(5)]),
  //   description: new FormControl('', [Validators.required]),
  //   start_date: new FormControl(''),
  //   end_date: new FormControl(''),
  //   responsible_organization: new FormControl(''),
  //   messages: new FormControl(''),
  //   event_type: new FormControl(''),
  //   assistents: new FormControl(''),
  //   created_by: new FormControl(''),
  //   location: new FormGroup({
  //     address: new FormControl(''),
  //     description: new FormControl(''),
  //     category: new FormControl(''),
  //     is_public: new FormControl(''),
  //     city_code: new FormControl(''),
  //     geo_point: new FormGroup({
  //       type: new FormControl(''),
  //       coordinates: new FormControl('')
  //     })
  //   }),
  //   images: new FormControl(''),
  //   status: new FormControl('active'),
  //   created_at: new FormControl(new Date().toISOString())
  // });

  // listEvent: EventForm[] = [];

  // Signal para almacenar los datos de la ubicación
  locationSaved = signal<any>(null);
  isModalOpen = false;

  constructor(
    private eventService: EventService,
  ) {}

  ngOnInit() { this.closeLocationModal(); }

  // Abrir el modal de ubicación
  openLocationModal() {
    this.isModalOpen = true; // Cambia el estado a abierto
  }

  // Cerrar el modal
  closeLocationModal() {
    this.isModalOpen = false; // Cambia el estado a cerrado
    // this.eventForm.get('location')?.reset(); // Limpia los datos del formulario de ubicación al cerrar el modal
  }

  // Manejar la recepción de los datos de la ubicación desde el componente de ubicación
  onLocationSaved(locationData: any) {
    // Asignamos los datos de la ubicación al formulario principal
    // this.eventForm.get('location')?.setValue(locationData);
    // Cerrar el modal
    this.closeLocationModal();
  }


  createEvent() {
    console.log('create event', this.eventForm().value);

    this.eventService.createEvent(this.eventForm().value).subscribe(res=> {
      if(res.success) {
        console.log('Event created successfully');
      }
    })
  }





  showMap(): void {
    this.isMapVisible = true; // Muestra el mapa y el formulario adicional
  }


  // async updateEvent() {
  //   // this.formEvent.setValue('testing');
  // }


}
