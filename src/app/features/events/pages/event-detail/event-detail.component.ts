import { CommonModule, JsonPipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, Pipe, signal } from '@angular/core';
import { EventService } from '../../services/event.service';
import { ActivatedRoute, RouterLink, RouterModule } from '@angular/router';
import MapOrgComponent from "../../../../shared/map-org/components/map-org/map-org.component";
import { EventForm } from '../../interfaces/events.interface';

@Component({
  selector: 'app-event-detail',
  standalone: true,
  imports: [ CommonModule, MapOrgComponent, RouterLink ],
  templateUrl: './event-detail.component.html',
  styleUrl: './event-detail.component.css'
})
export default class EventDetailComponent implements OnInit {

  // en esta propiedad guardamos el evento enviado desde el html
  @Input() event!: EventForm;

  isRequirementLoaded = false;


  constructor(
    private route: ActivatedRoute, // proporciona informacion sobre la ruta activa, obtiene el id entre otras
    private eventService: EventService
  ) { console.log('inicializando EventDetailComponent'); }

  ngOnInit(): void {
    this.getEventById();
  }

    /* getEventById() {
      this.route.params.subscribe(params => {
        const eventId = params['id'];
        console.log('eventId 6: ' + eventId);
        if (eventId) {
          this.eventService.getEventById(eventId).subscribe(event => {
            this.event = event;
            console.log('event', this.event);
          })
        }
    })
  } */


    getEventById() {
      const eventId = this.route.snapshot.paramMap.get('id');
      console.log('eventId => ' + eventId)
      if (eventId) {
        this.eventService.getEventById(eventId).subscribe(event => {
          this.event = event;
          console.log('event 2', this.event);
        })
      }

    }

}
