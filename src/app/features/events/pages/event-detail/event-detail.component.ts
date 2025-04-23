import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { EventService } from '../../services/event.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import MapOrgComponent from "../../../../shared/map-org/components/map-org/map-org.component";
import { EventForm } from '../../interfaces/events.interface';

@Component({
  selector: 'app-event-detail',
  standalone: true,
  imports: [CommonModule, MapOrgComponent, RouterLink],
  templateUrl: './event-detail.component.html',
  styleUrl: './event-detail.component.css'
})
export default class EventDetailComponent implements OnInit {

  // en esta propiedad guardamos el evento enviado desde el html
  @Input() event!: EventForm;

  isRequirementLoaded = false;


  constructor(
    private route: ActivatedRoute, // proporciona informacion sobre la ruta activa, obtiene el id entre otras
    private eventService: EventService,
    private router: Router
  ) { console.log('inicializando EventDetailComponent'); }

  ngOnInit(): void {
    this.getEventById();
  }

  /* getEventById() {
    this.route.params.subscribe(params => {
      const eventId = params['id'];
      console.log('eventId 6: ' + eventId);
      if (eventId) {
        this.eventService.getEventById(eventId).subscribe(event => {
          this.event = event;
          console.log('event', this.event);
        })
      }
  })
} */


  getEventById() {
    const eventId = this.route.snapshot.paramMap.get('id');
    console.log('eventId => ' + eventId)
    if (eventId) {
      this.eventService.getEventById(eventId).subscribe(event => {
        this.event = event;
        console.log('event 2', this.event);
      })
    }

  }

  deleteEvent(id: string) {
    if (confirm('¿Estás seguro de que deseas eliminar este evento?')) {
      this.eventService.deleteEvent(id).subscribe({
        next: () => {
          console.log('Evento eliminado con éxito');
          this.router.navigate(['/events']);
        },
        error: (error) => {
          console.error('Error eliminando el evento:', error);
          // Podés mostrar una notificación o alerta acá si querés
        }
      });
    }
  }


}
