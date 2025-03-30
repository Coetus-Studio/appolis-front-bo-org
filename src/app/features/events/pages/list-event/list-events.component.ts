import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output, signal, Signal, ViewChild } from '@angular/core';

import { EventService } from '../../services/event.service';
import { EventForm } from '../../interfaces/events.interface';
import { RouterModule } from '@angular/router';
import MapOrgComponent from '../../../../shared/map-org/components/map-org/map-org.component';


@Component({
  selector: 'app-list-events',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './list-events.component.html',
  styleUrl: './list-events.component.css'
})
export default class ListEventsComponent implements OnInit {

  @Output() eventClicked = new EventEmitter<{lat: number; lng: number}>();

  @ViewChild('mapComponent') mapComponent!: MapOrgComponent;


  eventOrg: EventForm[] = [];
  filteredEvents: EventForm[] = [];

  page: number = 1;

  constructor(private eventService: EventService) {}

  ngOnInit() {
    // TODO: quitar la inicializacion en ngOnInit y dejar con boton la llamada al getAllEvents
    this.getAllEvents();
  }

  async getAllEvents() {
    console.log('Getting all events')
    // const centerValue = this.center();

    this.eventService.getAllEvents().subscribe({
      next: (eventOrg) => {
        this.eventOrg = eventOrg;
        this.filteredEvents = eventOrg;
        console.log(this.eventOrg);
      },
      error: (error) => {
        console.error('Error fetching events:', error);
      }
    });
  }

  searchEvents(event: Event): void {
    const searchTerm = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredEvents = this.eventOrg.filter(e =>
      e.title.toLowerCase().includes(searchTerm) || e.description.toLowerCase().includes(searchTerm)
    );
  }

  focusOnEvent(event: any) {
    console.log('ingresando event: ' + JSON.stringify(event))
    const lat = event.location.geo_point.coordinates[0];
    const lng = event.location.geo_point.coordinates[1];

    // Emitimos las coordenadas al MapOrgComponent
    this.eventClicked.emit({ lat, lng });
    }
}
