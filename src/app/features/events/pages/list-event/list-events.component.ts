import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { EventService } from '../../services/event.service';
import { EventOrgInterface } from '../../interfaces/events.interface';

@Component({
  selector: 'app-list-events',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list-events.component.html',
  styleUrl: './list-events.component.css'
})
export default class ListEventsComponent implements OnInit {

  // TODO: agregar tipo interface Event
  items: EventOrgInterface[] = [];
  // items = [];

  constructor(private eventService: EventService) {
    console.log('Initializing ListEventsComponent');
  }

  ngOnInit(): void {
    this.getAllEvents();
  }

  async getAllEvents() {
    (await this.eventService.getAllEvents()).subscribe({
      next: (events) => {
        console.log('Received events:', events);
        this.items = events;
      },
      error: (error) => {
        console.error('Error fetching events:', error);
      }
    })

  }


}
