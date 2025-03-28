import { CommonModule } from '@angular/common';
import { Component, OnInit, signal, Signal, ViewChild } from '@angular/core';

import { EventService } from '../../services/event.service';
import { EventForm } from '../../interfaces/events.interface';
import { RouterModule } from '@angular/router';
import MapOrgComponent from '../../../../shared/map-org/components/map-org/map-org.component';


@Component({
  selector: 'app-list-events',
  standalone: true,
  imports: [CommonModule, RouterModule, MapOrgComponent],
  templateUrl: './list-events.component.html',
  styleUrl: './list-events.component.css'
})
export default class ListEventsComponent implements OnInit {

  // // TODO: agregar tipo interface Event
  eventOrg: EventForm[] = [];
  // filteredEvents = signal<EventForm[]>([]);
  filteredEvents: EventForm[] = [];

  page: number = 1;

  center = signal<google.maps.LatLngLiteral>({ lat: -33.45694, lng: -70.64827 });

  @ViewChild('mapComponent') mapComponent!: MapOrgComponent;

  constructor(private eventService: EventService) {
    console.log('Initializing ListEventsComponent');
  }

  ngOnInit() {
    this.getAllEvents();
  }

  async getAllEvents() {
    console.log('Getting all events')

    const centerValue = this.center();


    this.eventService.getAllEvents(centerValue).subscribe({
      next: (eventOrg) => {
        this.eventOrg = eventOrg;
        this.filteredEvents = eventOrg;
        console.log(this.eventOrg);
      },
      error: (error) => {
        console.error('Error fetching events:', error);
      }
    });
    console.log('saliendo all events')

  }

  searchEvents(event: Event): void {
    const searchTerm = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredEvents = this.eventOrg.filter(e =>
      e.title.toLowerCase().includes(searchTerm) || e.description.toLowerCase().includes(searchTerm)
    );
  }

  focusOnEvent(event: any) {
    if (this.mapComponent) {
      console.log('event', event);
      this.mapComponent.updateMapPosition(event);
    }
  }

}
