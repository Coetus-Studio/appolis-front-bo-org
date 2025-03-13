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

  // TODO: agregar tipo interface Event
  // public events: Signal<any> = signal([
  //   // {
  //   //   title: 'Event 2',
  //   //   description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  //   //   start_date: '2022-05-15',
  //   //   end_date: '2022-05-20',
  //   //   responsible_organization: 'Organization 1',
  //   //   messages: ['Message 1', 'Message 2'],
  //   //   event_type: 'Type 1',
  //   //   assistents: 'Assistent 1, Assistent 2',
  //   //   created_by: 'User 1',
  //   //   location: {
  //   //     address: 'Address 1',
  //   //     description: 'Description 1',
  //   //     category: 'Category 1',
  //   //     is_public: true,
  //   //     city_code: '12345',
  //   //     geo_point: {
  //   //       type: 'Point',
  //   //       coordinates: '123.456,789.012'
  //   //     },
  //   //   },
  //   //   images: ['image1.jpg', 'image2.jpg'],
  //   //   status: 'Published',
  //   //   created_at: '2022-05-01'
  //   // },
  //   //... more events...
  // ]);





  constructor(private eventService: EventService) {
    console.log('Initializing ListEventsComponent');
  }

  ngOnInit(): void {
    this.getAllEvents();
  }

  async getAllEvents() {

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


}
