import { CommonModule, JsonPipe } from '@angular/common';
import { Component, OnInit, Pipe } from '@angular/core';
import { EventService } from '../../services/event.service';
import { ActivatedRoute } from '@angular/router';
import MapOrgComponent from "../../../../shared/map-org/components/map-org/map-org.component";

@Component({
  selector: 'app-event-detail',
  standalone: true,
  imports: [CommonModule, MapOrgComponent],
  templateUrl: './event-detail.component.html',
  styleUrl: './event-detail.component.css'
})
export default class EventDetailComponent implements OnInit {


  constructor(
    private route: ActivatedRoute, // proporciona informacion sobre la ruta activa, obtiene el id entre otras
    private eventService: EventService) {

  }

  ngOnInit(): void {
    const eventId = this.route.snapshot.paramMap.get('id');
    if (eventId) {
      this.getEventById(eventId);
    }
  }

  event: any;

  getEventById(id: string): any {
    console.log('id: ' + id);
    this.eventService.getEventById(id).subscribe({
      next: (event: any) => {
        this.event = event;
      },
      error: (error: any) => {
        console.error('Error:', error);
      }
    });
  }

}
