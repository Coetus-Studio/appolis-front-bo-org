import { CommonModule, JsonPipe } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EventService } from '../../services/event.service';
import { RouterLink, RouterOutlet } from '@angular/router';
import  LocationFormComponent  from '../../../../shared/map-org/components/location-form/location-form.component';
import { LocationsService } from '../../../../shared/map-org/services/locations.service';

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

  eventForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(5)]),
    description: new FormControl('', [Validators.required]),
    start_date: new FormControl(''),
    end_date: new FormControl(''),
    responsible_organization: new FormControl(''),
    created_by: new FormControl(''),
  });

  // Objeto para almacenar la ubicación seleccionada
  location: any;  // Aquí almacenas la ubicación seleccionada

  isModalOpen = false;
  isLocationSaved = false; // Controla si la ubicación fue guardada o no
  eventLocationSaved = signal<any>(false); //
    // Signal que contendrá la información de la ubicación
  // locationData = signal<any>({});

  constructor(
    private eventService: EventService,
    private locationService: LocationsService
  ) {}

  ngOnInit() { }

  // Abrir el modal de ubicación
  openLocationModal() {
    this.isModalOpen = true; // Cambia el estado a abierto
  }

  // Cerrar el modal
  closeLocationModal() {
    this.isModalOpen = false; // Cambia el estado a cerrado
    // this.eventForm.get('location')?.reset(); // Limpia los datos del formulario de ubicación al cerrar el modal
  }

  // envia el formulario de evento y guarda la ubicación
  createEvent() {
    // voy al service a buscar la señal y la asigno a this.location
    this.location = this.locationService.locationData();

    if (this.eventForm.valid && this.location) {
      const eventData = {
        ...this.eventForm.value,
        // location: this.locationService.locationData() // accedo a datos del servicio CONFIRMAR
        location: this.location // accedo a datos obtenido desde la señal

      };
      console.log('Datos listos para enviar al backend:', eventData);

      // TODO: comprobar si esto se puede hacer de otra forma
      // Si algún campo puede ser null o undefined, asignamos un valor predeterminado
      const sanitizedEventData = {
        title: eventData.title || '', // Asignar un valor por defecto si es null o undefined
        description: eventData.description || '', // Lo mismo para otros campos
        start_date: eventData.start_date || '',
        end_date: eventData.end_date || '',
        responsible_organization: eventData.responsible_organization || '',
        created_by: eventData.created_by || '',
        location: eventData.location,
      };

      console.log('Datos listos para enviar al backend:', sanitizedEventData);

       // Llamamos al servicio para enviar los datos al backend
    this.eventService.createEvent(sanitizedEventData).subscribe(res => {
      console.log('Event created successfully', res);
    });

    } else {
      console.log('El formulario o los datos de ubicación no están completos.');
    }
  }

  // Muestra el mapa y el formulario adicional
  showMap(): void {
    this.isMapVisible = true;
  }

}
