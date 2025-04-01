import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { EventFormComponent } from "../../components/event-form/event-form.component";
import { FormGroup } from '@angular/forms';
import { EventForm } from '../../interfaces/events.interface';
import { EventService } from '../../services/event.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-event',
  standalone: true,
  imports: [EventFormComponent, CommonModule],
  templateUrl: './edit-event.component.html',
  styleUrl: './edit-event.component.css'
})
export default class EditEventComponent implements OnInit {


  event!: EventForm; // Inicializado como null para manejar casos en los que no se cargue ningún evento.

  // eventId: string = '';

  constructor(
    private eventService: EventService,
    private route: ActivatedRoute
  ) {
    console.log('EditEventComponent initialized');
    // this.ngOnInit()
    const eventId = this.route.snapshot.paramMap.get('id');
    console.log('eventId EditEventComponent: ' + eventId);

  }

  // obtiene Id
  ngOnInit(): void {
    // this.eventService.event$.subscribe(event => {
    //   this.event = event; // almacenamos aqui el evento recibido desde el servicio y el observable
    //   console.log('evento recibido: ', this.event);
    // })
    this.getEventById();

  }

  getEventById() {
    const eventId = this.route.snapshot.paramMap.get('id');
    if (eventId) {
      this.eventService.getEventById(eventId).subscribe(event => {
        this.event = event;
        console.log('event', this.event);
      })
    }

  }

}
