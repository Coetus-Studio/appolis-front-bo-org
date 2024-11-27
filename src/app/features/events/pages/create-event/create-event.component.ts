import { Component, OnInit } from '@angular/core';
import { EventService } from '../../services/event.service';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { EventFormComponent } from '../../components/event-form/event-form.component';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'app-create-event',
  standalone: true,
  imports: [CommonModule, EventFormComponent],
  templateUrl: './create-event.component.html',
  styleUrl: './create-event.component.css'
})
export default class CreateEventComponent implements OnInit {

  constructor(private eventService: EventService) { console.log('create event'); }

  ngOnInit(): void {
    console.log('implement');
    // throw new Error('Method not implemented.');
  }





}
