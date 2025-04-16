import { Component, EventEmitter, OnDestroy, OnInit, Output, signal } from '@angular/core';
import { EventService } from '../../services/event.service';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { EventFormComponent } from '../../components/event-form/event-form.component';
import { fromEvent } from 'rxjs';
import { EventForm } from '../../interfaces/events.interface';
import { EventFormService } from '../../services/event-form.service';

@Component({
  selector: 'create-event',
  standalone: true,
  imports: [CommonModule, EventFormComponent],
  templateUrl: './create-event.component.html',
  styleUrl: './create-event.component.css'
})
export default class CreateEventComponent implements OnInit, OnDestroy {

  eventForm: any;

  successMessage: string | null = null;
  successUpdateMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(
    private eventService: EventService,
    private eventFormService: EventFormService) {
    console.log('create event');
  }
  ngOnDestroy(): void {
    this.eventForm.reset();
  }

  ngOnInit(): void {
    console.log('implement CreateEventComponent');
    this.eventForm = this.eventFormService.getForm();
    console.log("eventForm 3: ", this.eventForm)
    // throw new Error('Method not implemented.');
  }

}
