import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

import { EventFormComponent } from '../../components/event-form/event-form.component';
import { EventService } from '../../services/event.service';
import { MapOrgComponent } from '../../../../shared/map-org/components/map-org.component';

@Component({
  selector: 'app-create-event',
  standalone: true,
  imports: [CommonModule, EventFormComponent, RouterOutlet, MapOrgComponent],
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
