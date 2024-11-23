import { Component, OnInit } from '@angular/core';
import { EventService } from '../../services/event.service';
import { CommonModule } from '@angular/common';
import { EventOrgInterface } from '../../interfaces/events.interface';
import { RouterOutlet } from '@angular/router';
import { CreateFormComponent } from '../../components/create-form/create-form.component';

@Component({
  selector: 'app-create-event',
  standalone: true,
  imports: [CommonModule, RouterOutlet, CreateFormComponent],
  templateUrl: './create-event.component.html',
  styleUrl: './create-event.component.css'
})
export default class CreateEventComponent implements OnInit {

  // formEvent: EventOrgInterface = {
  //   title: '',
  //   description: '',
  //   start_date: '',
  //   end_date: '',
  //   responsible_organization: '',
  //   messages: [],
  //   event_type: '',
  //   assistents: [],
  //   created_by: '',
  //   location: '',
  //   images: [],
  //   status: '',
  //   created_at: ''
  // }

  constructor(private eventService: EventService) { console.log('create event'); }

  ngOnInit(): void {
    console.log('implement');
    // throw new Error('Method not implemented.');
  }

  // async onSubmit() {
  //   const eventOrg = {
  //     // title: this.formEvent.title,
  //     // description: this.formEvent.description,
  //     // start_date: this.formEvent.start_date,
  //     // end_date: this.formEvent.end_date,
  //     // responsible_organization: this.formEvent.responsible_organization,
  //     // messages: this.formEvent.messages,
  //     // event_type: this.formEvent.event_type,
  //     // assistents: this.formEvent.assistents,
  //     // created_by: this.formEvent.created_by,
  //     // location: this.formEvent.location,
  //     // images: this.formEvent.images,
  //     // status: 'active',
  //     // created_at: new Date().toISOString()
  //   };

  //   this.eventService.createEvent(eventOrg).subscribe({
  //     next: () => {
  //       console.log('Event created successfully');
  //     },
  //     error: (error) => {
  //       console.error('Error creating event:', error);
  //     }
  //   })
  // }

}
