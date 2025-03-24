import { CommonModule } from '@angular/common';
import { Component, OnInit, signal, Signal } from '@angular/core';

import { EventService } from '../../services/event.service';
import { EventForm } from '../../interfaces/events.interface';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-list-events',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './list-events.component.html',
  styleUrl: './list-events.component.css'
})
export default class ListEventsComponent implements OnInit {

  // // TODO: agregar tipo interface Event
  public eventOrg: EventForm[] = [];
  public filteredEvents: EventForm[] = [];
  public page: number = 1;

  constructor(private eventService: EventService) {
    console.log('Initializing ListEventsComponent');
  }

  ngOnInit() {
    this.getAllEvents();
  }

  async getAllEvents() {
    console.log('Getting all events')

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
    console.log('saliendo all events')

  }

  searchEvents(event: Event): void {
    const searchTerm = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredEvents = this.eventOrg.filter(e =>
      e.title.toLowerCase().includes(searchTerm) || e.description.toLowerCase().includes(searchTerm)
    );
  }


}
