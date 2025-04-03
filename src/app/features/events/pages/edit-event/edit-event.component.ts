import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { EventFormComponent } from "../../components/event-form/event-form.component";
import { FormGroup } from '@angular/forms';
import { EventForm } from '../../interfaces/events.interface';
import { EventService } from '../../services/event.service';
import { CommonModule } from '@angular/common';
import { EventFormService } from '../../services/event-form.service';

@Component({
  selector: 'app-edit-event',
  standalone: true,
  imports: [EventFormComponent, CommonModule],
  templateUrl: './edit-event.component.html',
  styleUrl: './edit-event.component.css'
})
export default class EditEventComponent implements OnInit, OnDestroy {

  isUpdating: boolean = true;

  successMessage: string | null = null;
  successUpdateMessage: string | null = null;
  errorMessage: string | null = null;

  eventForm: any;

  constructor(
    private eventService: EventService,
    private eventFormService: EventFormService,
    private route: ActivatedRoute
  ) {
    // const eventId = this.route.snapshot.paramMap.get('id');
    this.eventForm = this.eventFormService.getForm();

  }
  ngOnDestroy(): void {
    // this.eventForm.reset();
  }

  // obtiene Id
  ngOnInit(): void {
    this.getUpdatedEventById();
  }

  // TODO: ver si este servicio puede colapsar si lo llamo desde aqui para el update
  getUpdatedEventById() {
    this.isUpdating = true;
    const eventId = this.route.snapshot.paramMap.get('id');
    if (eventId) {
      this.eventService.getEventByIdToUpdate(eventId, this.isUpdating).subscribe(event => {
        this.eventForm = event;
        console.log('event', this.eventForm);
      })
    }
  }
}
