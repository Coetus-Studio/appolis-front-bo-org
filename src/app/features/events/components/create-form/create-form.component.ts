import { CommonModule, JsonPipe } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { EventOrgInterface } from '../../interfaces/events.interface';
import { EventService } from '../../services/event.service';

@Component({
  selector: 'app-create-form',
  standalone: true,
  imports: [ CommonModule, ReactiveFormsModule, JsonPipe ],
  templateUrl: './create-form.component.html',
  styleUrl: './create-form.component.css'
})
export class CreateFormComponent implements OnInit {

  // señal de tipo de dato formGroup
  form = signal<FormGroup>(

    // argumentos
    // FormControl: clase especial para tener el control sobre el formulario. Recibe parametro inicial, se pueden agregar validadores asincronos o sincronos.
    new FormGroup({
      title: new FormControl('', [Validators.required, Validators.minLength(5)]),
      description: new FormControl('', [Validators.required]),
      start_date: new FormControl('', [Validators.required]),
      end_date: new FormControl('', [Validators.required]),
      responsible_organization: new FormControl('', [Validators.required]),
      messages: new FormControl('', []),
      event_type: new FormControl('', [Validators.required]),
      assistents: new FormControl('', []),
      created_by: new FormControl('', [Validators.required]),
      location: new FormControl('', [Validators.required]),
      images: new FormControl('', []),
      status: new FormControl('active', []),
      created_at: new FormControl(new Date().toISOString(), [])
    })
  );


  constructor(
    private eventService: EventService,
    // private formBuilder: FormBuilder
  ) { }

  ngOnInit() {}

  async onSubmit() {
    const eventOrg = {
      // title: this.formEvent.title,
      // description: this.formEvent.description,
      // start_date: this.formEvent.start_date,
      // end_date: this.formEvent.end_date,
      // responsible_organization: this.formEvent.responsible_organization,
      // messages: this.formEvent.messages,
      // event_type: this.formEvent.event_type,
      // assistents: this.formEvent.assistents,
      // created_by: this.formEvent.created_by,
      // location: this.formEvent.location,
      // images: this.formEvent.images,
      // status: 'active',
      // created_at: new Date().toISOString()
    };

    (await this.eventService.createEvent(eventOrg)).subscribe({
      next: () => {
        console.log('Event created successfully');
      },
      error: (error) => {
        console.error('Error creating event:', error);
      }
    })
  }

  async updateEvent() {
    // this.formEvent.setValue('testing');
  }

}
