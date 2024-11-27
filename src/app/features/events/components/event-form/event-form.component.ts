import { CommonModule, JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EventService } from '../../services/event.service';
import { EventForm } from '../../interfaces/events.interface';

@Component({
  selector: 'app-event-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, JsonPipe],
  templateUrl: './event-form.component.html',
  styleUrl: './event-form.component.css'
})
export class EventFormComponent implements OnInit {

  isUpdate: boolean = false;

  eventForm: FormGroup = new FormGroup({});

  listEvent: EventForm[] = [];

  constructor(
    private eventService: EventService,
  ) {
    this.eventForm = new FormGroup({
      title: new FormControl('', [Validators.required, Validators.minLength(5)]),
      description: new FormControl('', [Validators.required]),
      start_date: new FormControl('', ),
      end_date: new FormControl(''),
      responsible_organization: new FormControl(''),
      messages: new FormControl('', []),
      event_type: new FormControl(''),
      assistents: new FormControl(''),
      created_by: new FormControl(''),
      location: new FormGroup({
        address: new FormControl(''),
        description: new FormControl(''),
        category: new FormControl('', ),
        is_public: new FormControl(''),
        city_code: new FormControl(''),
        geo_point: new FormGroup({
          type: new FormControl(''),
          coordinates: new FormControl('')
        })
      }),
      images: new FormControl('', []),
      status: new FormControl('active', []),
      created_at: new FormControl(new Date().toISOString(), [])
    })
  }

  ngOnInit() { }

  async createEvent() {
    console.log('create event', this.eventForm.value);

    this.eventService.createEvent(this.eventForm.value).subscribe(res=> {
      if(res.success) {
        console.log('Event created successfully');
      }
    })


  }

  async updateEvent() {
    // this.formEvent.setValue('testing');
  }

}
